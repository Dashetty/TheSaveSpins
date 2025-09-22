import React, { useState, useEffect } from 'react';
import { supabase } from './supa';

function App() {
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setBookmarks(data);
  }

  async function addBookmark(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ url: url, note: note }])
      .select();
    if (!error) {
      setBookmarks([data[0], ...bookmarks]);
      setUrl('');
      setNote('');
    } else {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">TheSavePins</h1>
          <p className="text-sm text-gray-500">Finally Dash can save his stuffs/links at one corner of the Internet</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <form onSubmit={addBookmark} className="mb-6 grid gap-3 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
          <input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="text"
            placeholder="Enter Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          />
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {bookmarks.map((b) => (
            <li key={b.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <a href={b.url} target="_blank" rel="noreferrer" className="truncate font-medium text-blue-600 hover:underline">
                  {b.url}
                </a>
                {b.created_at && (
                  <span className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString()}</span>
                )}
              </div>
              {b.note && <p className="mt-2 text-sm text-gray-700">{b.note}</p>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
