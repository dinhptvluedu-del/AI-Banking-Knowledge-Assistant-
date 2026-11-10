/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BankDocument, RoleType, User, AiConfig, AuditLog } from './types';
import { MOCK_USERS } from './data/mockUsers';
import { MOCK_DOCUMENTS } from './data/mockDocuments';
import { DEFAULT_AI_CONFIG, MOCK_AUDIT_LOGS } from './data/mockData';
import { Header } from './components/layout/Header';
import { Sidebar, NavItem } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { AiChatAssistant } from './components/chat/AiChatAssistant';
import { DocumentList } from './components/documents/DocumentList';
import { DocumentDetailModal } from './components/documents/DocumentDetailModal';
import { UploadDocumentModal } from './components/documents/UploadDocumentModal';
import { DocumentDiffViewer } from './components/documents/DocumentDiffViewer';
import { AdvancedSearch } from './components/documents/AdvancedSearch';
import { HistoryView } from './components/history/HistoryView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { UserManagement } from './components/admin/UserManagement';
import { AiConfigView } from './components/admin/AiConfigView';
import { RagBenchmarkView } from './components/admin/RagBenchmarkView';
import { AuditLogView } from './components/admin/AuditLogView';

export default function App() {
  // Current user state (Default: Teller Quầy 03)
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [currentTab, setCurrentTab] = useState<NavItem>('assistant');
  const [documents, setDocuments] = useState<BankDocument[]>(MOCK_DOCUMENTS);
  const [aiConfig, setAiConfig] = useState<AiConfig>(DEFAULT_AI_CONFIG);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  // Modal states
  const [activeDocModal, setActiveDocModal] = useState<{
    doc: BankDocument;
    clause?: string;
    pageNumber?: number;
  } | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Helper to record audit events
  const handleLogAudit = (
    action: AuditLog['action'],
    description: string,
    details?: any
  ) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      description,
      ipAddress: '10.24.18.42',
      status: 'SUCCESS',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Open Document Detail modal
  const handleOpenDoc = (docId: string, clause?: string, pageNumber?: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setActiveDocModal({ doc, clause, pageNumber });
      handleLogAudit('AI_QUERY', `Xem văn bản chi tiết [${doc.docCode}]`, { docId, clause, pageNumber });
    }
  };

  // Approve a pending document (Manager/Admin action)
  const handleApproveDoc = (docId: string) => {
    setDocuments(prev =>
      prev.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'ACTIVE',
            approvedBy: currentUser.name,
            approvalDate: new Date().toISOString().split('T')[0]
          };
        }
        return d;
      })
    );
    if (activeDocModal && activeDocModal.doc.id === docId) {
      setActiveDocModal(prev => prev ? {
        ...prev,
        doc: {
          ...prev.doc,
          status: 'ACTIVE',
          approvedBy: currentUser.name,
          approvalDate: new Date().toISOString().split('T')[0]
        }
      } : null);
    }
    handleLogAudit('DOCUMENT_APPROVE', `Phê duyệt ban hành văn bản [${docId}] vào kho tri thức RAG`, { docId });
  };

  // Add newly uploaded document
  const handleDocumentAdded = (newDoc: BankDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
    handleLogAudit('DOCUMENT_UPLOAD', `Tải lên tài liệu mới: [${newDoc.docCode}] ${newDoc.title}`, {
      docId: newDoc.id,
      chunksCount: newDoc.chunks.length
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onSwitchUser={(user) => {
          setCurrentUser(user);
          handleLogAudit('LOGIN', `Chuyển phiên làm việc sang [${user.name}] (${user.role})`);
        }}
        activeView={currentTab}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          userRole={currentUser.role}
        />

        {/* Main Content View Container */}
        <main className="flex-1 overflow-y-auto bg-slate-100/60 min-w-0">
          {currentTab === 'dashboard' && (
            <DashboardView
              documents={documents}
              currentUser={currentUser}
              onNavigateTab={setCurrentTab}
              onOpenDoc={handleOpenDoc}
            />
          )}

          {currentTab === 'assistant' && (
            <AiChatAssistant
              currentUser={currentUser}
              documents={documents}
              onOpenDoc={handleOpenDoc}
              onLogAudit={handleLogAudit}
            />
          )}

          {currentTab === 'documents' && (
            <DocumentList
              documents={documents}
              currentUser={currentUser}
              onOpenDoc={handleOpenDoc}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          )}

          {currentTab === 'diff' && (
            <DocumentDiffViewer
              documents={documents}
              onOpenDoc={handleOpenDoc}
            />
          )}

          {currentTab === 'search' && (
            <AdvancedSearch
              documents={documents}
              onOpenDoc={handleOpenDoc}
            />
          )}

          {currentTab === 'history' && (
            <HistoryView
              currentUser={currentUser}
              onOpenDoc={handleOpenDoc}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              documents={documents}
            />
          )}

          {currentTab === 'users' && (
            <UserManagement
              currentUser={currentUser}
              onLogAudit={handleLogAudit}
            />
          )}

          {currentTab === 'config' && (
            <AiConfigView
              config={aiConfig}
              onUpdateConfig={setAiConfig}
              documents={documents}
              currentUser={currentUser}
              onLogAudit={handleLogAudit}
            />
          )}

          {currentTab === 'benchmark' && (
            <RagBenchmarkView
              documents={documents}
              onLogAudit={handleLogAudit}
            />
          )}

          {currentTab === 'audit' && (
            <AuditLogView
              logs={auditLogs}
            />
          )}
        </main>
      </div>

      {/* Document Detail & Citation Verification Modal */}
      {activeDocModal && (
        <DocumentDetailModal
          document={activeDocModal.doc}
          initialClause={activeDocModal.clause}
          initialPage={activeDocModal.pageNumber}
          userRole={currentUser.role}
          onClose={() => setActiveDocModal(null)}
          onApproveDoc={handleApproveDoc}
        />
      )}

      {/* Upload Document Modal */}
      {isUploadOpen && (
        <UploadDocumentModal
          currentUser={currentUser}
          onClose={() => setIsUploadOpen(false)}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
}
