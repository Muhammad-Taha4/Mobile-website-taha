'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';
import {
    Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon,
    ArrowLeft, Save, Eye, EyeOff
} from 'lucide-react';

const API = 'http://localhost:5000';

// ── Toolbar Button ──────────────────────────────────────
function ToolbarBtn({ onClick, active, title, children }: any) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={`p-2 rounded-lg transition-all text-sm ${active
                ? 'bg-[#0B4182] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'}`}
        >
            {children}
        </button>
    );
}

// ── Divider ─────────────────────────────────────────────
function ToolbarDivider() {
    return <span className="w-px h-5 bg-slate-200 mx-1" />;
}

export default function PageEditorPage() {
    const params = useParams();
    const router = useRouter();
    const token = useAuthStore(state => state.token);
    const slug = params?.slug as string;

    const [pageTitle, setPageTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' } }),
            CharacterCount.configure({ limit: 50000 }),
        ],
        content: '<p>Loading...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none min-h-[500px] p-6 focus:outline-none text-slate-800 leading-relaxed',
            },
        },
    });

    useEffect(() => {
        if (!slug) return;
        fetchPage();
    }, [slug]);

    const fetchPage = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API}/api/admin/pages/${slug}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPageTitle(data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()));
                editor?.commands.setContent(data.content || '<p>Start editing this page...</p>');
            }
        } catch {
            toast.error('Failed to load page content');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editor) return;
        setIsSaving(true);
        try {
            const res = await fetch(`${API}/api/admin/pages/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: pageTitle,
                    content: editor.getHTML()
                })
            });
            const data = await res.json();
            if (res.ok) {
                setLastSaved(new Date());
                toast.success('Page saved successfully!');
            } else {
                toast.error(data.message || 'Failed to save page');
            }
        } catch {
            toast.error('Network error saving page');
        } finally {
            setIsSaving(false);
        }
    };

    const setLink = useCallback(() => {
        const prev = editor?.getAttributes('link').href;
        const url = window.prompt('Enter URL:', prev || 'https://');
        if (url === null) return;
        if (url === '') { editor?.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (isLoading) return (
        <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0B4182] border-t-transparent" />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => router.push('/admin/cms')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors"
                >
                    <ArrowLeft size={16} /> Back to CMS
                </button>
                <div className="flex items-center gap-3">
                    {lastSaved && (
                        <span className="text-xs text-slate-400 font-medium">
                            Saved {lastSaved.toLocaleTimeString()}
                        </span>
                    )}
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                    >
                        {showPreview ? <><EyeOff size={15} /> Edit</> : <><Eye size={15} /> Preview</>}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-bold bg-[#0B4182] hover:bg-[#083163] text-white rounded-xl transition-all shadow-lg shadow-[#0B4182]/20 disabled:opacity-60"
                    >
                        {isSaving
                            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                            : <><Save size={15} /> Save Page</>
                        }
                    </button>
                </div>
            </div>

            {/* Page Title */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4 shadow-sm">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Page Title</label>
                <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full text-2xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                    placeholder="Enter page title..."
                />
            </div>

            {/* Editor */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {!showPreview && (
                    /* Toolbar */
                    <div className="flex flex-wrap items-center gap-0.5 p-3 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
                        <ToolbarBtn
                            title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()}
                            active={editor?.isActive('bold')}
                        ><Bold size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()}
                            active={editor?.isActive('italic')}
                        ><Italic size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Strikethrough" onClick={() => editor?.chain().focus().toggleStrike().run()}
                            active={editor?.isActive('strike')}
                        ><Strikethrough size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Inline Code" onClick={() => editor?.chain().focus().toggleCode().run()}
                            active={editor?.isActive('code')}
                        ><Code size={15} /></ToolbarBtn>

                        <ToolbarDivider />

                        <ToolbarBtn
                            title="Heading 1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                            active={editor?.isActive('heading', { level: 1 })}
                        ><Heading1 size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Heading 2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            active={editor?.isActive('heading', { level: 2 })}
                        ><Heading2 size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Heading 3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                            active={editor?.isActive('heading', { level: 3 })}
                        ><Heading3 size={15} /></ToolbarBtn>

                        <ToolbarDivider />

                        <ToolbarBtn
                            title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            active={editor?.isActive('bulletList')}
                        ><List size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Numbered List" onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            active={editor?.isActive('orderedList')}
                        ><ListOrdered size={15} /></ToolbarBtn>
                        <ToolbarBtn
                            title="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                            active={editor?.isActive('blockquote')}
                        ><Quote size={15} /></ToolbarBtn>

                        <ToolbarDivider />

                        <ToolbarBtn title="Add Link" onClick={setLink} active={editor?.isActive('link')}>
                            <LinkIcon size={15} />
                        </ToolbarBtn>

                        <ToolbarDivider />

                        <ToolbarBtn title="Undo" onClick={() => editor?.chain().focus().undo().run()}>
                            <Undo size={15} />
                        </ToolbarBtn>
                        <ToolbarBtn title="Redo" onClick={() => editor?.chain().focus().redo().run()}>
                            <Redo size={15} />
                        </ToolbarBtn>
                    </div>
                )}

                {/* Editor / Preview Toggle */}
                {showPreview ? (
                    <div
                        className="prose prose-slate max-w-none p-8 min-h-[500px] text-slate-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
                    />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>

            {/* Word Count Footer */}
            <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-xs text-slate-400">
                    {editor?.storage.characterCount?.words?.() ?? 0} words · {editor?.getText().length ?? 0} characters
                </p>
                <p className="text-xs text-slate-400">
                    Slug: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">{slug}</code>
                </p>
            </div>
        </div>
    );
}
