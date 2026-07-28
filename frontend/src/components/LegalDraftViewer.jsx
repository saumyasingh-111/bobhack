import { useKiosk } from '../context/KioskContext';
import { FileText, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function LegalDraftViewer() {
  const { transcript, legalDraft, pdfPath, resetKiosk } = useKiosk();

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-[85vh]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-lg font-bold text-nyaya-blue uppercase tracking-wider">Step 3 of 3</span>
          <h2 className="text-3xl font-extrabold text-slate-800">Generated Legal Petition Draft</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={resetKiosk}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl"
          >
            New Recording
          </button>
          {pdfPath && (
            <a
              href={`http://localhost:8000${pdfPath}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Printable PDF</span>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Vernacular Transcript */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-xl mb-4 pb-2 border-b">
            <FileText className="w-6 h-6 text-nyaya-blue" />
            <span>Spoken Oral Testimony (Raw Audio STT)</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-lg leading-relaxed min-h-[250px] whitespace-pre-wrap">
            "{transcript || 'No transcript available.'}"
          </div>
        </div>

        {/* Right Column: Extracted Legal Schema */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-xl mb-4 pb-2 border-b">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span>Structured Legal Petition Draft</span>
          </div>

          {legalDraft ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <span className="text-xs font-bold text-slate-400 uppercase">Complainant</span>
                  <p className="font-semibold text-slate-800">{legalDraft.complainant_name || 'Unspecified'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <span className="text-xs font-bold text-slate-400 uppercase">Incident Date</span>
                  <p className="font-semibold text-slate-800">{legalDraft.incident_date || 'Unspecified'}</p>
                </div>
              </div>

              <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-lg">
                <span className="text-xs font-bold text-amber-700 uppercase flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4 mr-1 inline" /> Applicable BNS Sections
                </span>
                <p className="font-bold text-amber-900 mt-1">
                  {Array.isArray(legalDraft.suggested_sections)
                    ? legalDraft.suggested_sections.join(', ')
                    : legalDraft.suggested_sections || 'BNS Section 352'}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border">
                <span className="text-xs font-bold text-slate-400 uppercase">Incident Location</span>
                <p className="font-semibold text-slate-800">{legalDraft.incident_location || 'Unspecified'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border">
                <span className="text-xs font-bold text-slate-400 uppercase">Legal Incident Summary</span>
                <p className="text-slate-800 text-sm mt-1">{legalDraft.incident_summary || 'N/A'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border">
                <span className="text-xs font-bold text-slate-400 uppercase">Remedy Sought</span>
                <p className="text-slate-800 text-sm mt-1">{legalDraft.remedy_sought || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic">No structured data parsed.</p>
          )}
        </div>
      </div>
    </div>
  );
}