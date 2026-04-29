    const DEFAULT_RATE = 8;
    const STORAGE_CLIENTS_KEY = 'invoice_client_history_v1';
    const STORAGE_EMAILS_KEY = 'invoice_email_history_v1';
    const STORAGE_TASK_NAMES_KEY = 'invoice_task_name_history_v1';
    const STORAGE_TASK_DESCRIPTIONS_KEY = 'invoice_task_description_history_v1';
    const STORAGE_TASK_CATEGORIES_KEY = 'invoice_task_category_history_v1';
    const STORAGE_INVOICE_SEQ_KEY = 'invoice_sequence_v1';
    const STORAGE_USED_INVOICE_IDS_KEY = 'invoice_used_ids_v1';
    const STORAGE_EMAILJS_PUBLIC_KEY = 'invoice_emailjs_public_key_v1';
    const STORAGE_EMAILJS_SERVICE_ID = 'invoice_emailjs_service_id_v1';
    const STORAGE_EMAILJS_TEMPLATE_ID = 'invoice_emailjs_template_id_v1';
    const STORAGE_DRIVE_CLIENT_ID = 'invoice_drive_client_id_v1';
    const STORAGE_GOOGLE_SHEET_ID = 'invoice_google_sheet_id_v1';
    const STORAGE_FORM_DRAFT_KEY = 'invoice_buyer_form_draft_v1';
    const STORAGE_DOWNLOAD_HISTORY_KEY = 'invoice_download_history_v1';
    const TRANSACTION_TAB_NAME = 'Invoice 2';
    const STORAGE_LICENSE_KEY = 'invoice_license_key_v1';
    const STORAGE_UPDATE_DISMISSED_VERSION = 'invoice_update_dismissed_version_v1';
    const STORAGE_ADMIN_UNLOCKED = 'invoice_admin_unlocked_v1';
    const IMAGE_DB_NAME = 'invoice_image_store_v1';
    const IMAGE_DB_STORE = 'images';
    const STORAGE_TRIAL_SEND_COUNT = 'invoice_trial_send_count_v1';
    const DEFAULT_EMAILJS_PUBLIC_KEY = '';
    const DEFAULT_EMAILJS_SERVICE_ID = '';
    const DEFAULT_EMAILJS_TEMPLATE_ID = '';
    // If Google OAuth field is hidden in UI, set your Client ID here.
    const DEFAULT_GOOGLE_DRIVE_CLIENT_ID = '';
    const APP_VERSION = '0.1.0';
    const APP_BUILD_ROLE = 'BUYER';
    const APP_KEY_VERSION = 'V010';
    const APP_DISTRIBUTION_ID = 'D0001';
    const REQUIRED_BUYER_KEY = `INVBUY-${APP_KEY_VERSION}-${APP_DISTRIBUTION_ID}`;
    const BUILD_INTEGRITY_PROOF = 'BUYER|0.1.0|V010|D0001';
    const TRIAL_SEND_LIMIT = 3;
    const ADMIN_OWNER_CODE = '';// disabled in buyer build
    const LATEST_AVAILABLE_VERSION = '0.1.1';
    const GUMROAD_UPDATE_URL = 'https://your-store.gumroad.com/l/invoice-studio';
    const UPDATE_MANIFEST_URL = '';
    const VALID_LICENSE_KEYS = Array.from({ length: 1000 }, (_, index) => {
      const seq = String(index + 1).padStart(4, '0');
      return `INVBUY-${APP_KEY_VERSION}-K${seq}`;
    });
    const MAX_HISTORY_ITEMS = 10;
    const MAX_DOWNLOAD_HISTORY_ITEMS = 40;
    const DEFAULT_TASK_NAME_OPTIONS = [
      'Title advice',
      'Automation setup',
      'Audit',
      'Administrative support',
      'Email support',
      'Executive assistant',
      'Ad copy review',
      'Ad placement',
    ];
    const DEFAULT_TASK_DESCRIPTION_OPTIONS = [
      'Support',
      'Ad copy',
      'Graphics',
      'Adhoc task',
    ];
    const DEFAULT_TASK_CATEGORY_OPTIONS = [
      'Admin',
      'ManyChat',
      'Canva',
      'Facebook',
    ];
    const DEFAULT_NOTE = 'Thank you for using our service. Your invoice is ready for payment. Please check the details below. If you have any concern or feedback before payment, please message us so we can revise the invoice promptly.';
    const DEFAULT_CC_EMAILS = '';
    const INVOICE_APP_PROMO_URL = 'https://cdn.jsdelivr.net/gh/juniper1947/global-image-library@main/docs/uploads/2026-04-go-grren/06-social-tiktok.png';
    const INVOICE_APP_PROMO_LABEL = 'link here';
    // Seller setup: point this to your upload API (Cloudinary/S3/Supabase proxy endpoint).
    // Buyers do not need to configure anything when this is prefilled.
    const PUBLIC_IMAGE_UPLOAD_ENDPOINT = '';
    // Optional seller token if your upload API expects Authorization: Bearer <token>.
    const PUBLIC_IMAGE_UPLOAD_AUTH_TOKEN = '';
    const INVOICE_LOGO_DATA_URL = (() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#111827';
        ctx.fillRect(24, 24, 72, 72);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px Arial';
        ctx.fillText('I', 49, 73);
        ctx.fillStyle = '#111827';
        ctx.font = '700 36px Arial';
        ctx.fillText('Invoice Studio', 114, 64);
        ctx.fillStyle = '#6b7280';
        ctx.font = '500 16px Arial';
        ctx.fillText('Statement & Billing', 116, 88);
        return canvas.toDataURL('image/png');
      } catch (error) {
        return '';
      }
    })();
    const state = {
      tasks: [],
      editingIndex: null,
      lastAutoTaskEnd: '',
      formFiles: [],
      testUploadFiles: [],
      gmailDraftUrl: '',
      lastEmailError: '',
      driveFolderUrl: '',
      invoiceWebCopyUrl: '',
      transactionSheetUrl: '',
      historyShowAll: false,
      historySelectedIds: [],
      remoteUpdate: null,
      adminUnlocked: false,
      licensed: false,
      tamperLocked: false,
    };

	    const elements = {
      licenseGate: document.getElementById('licenseGate'),
      licenseKeyInput: document.getElementById('licenseKeyInput'),
      unlockAppButton: document.getElementById('unlockAppButton'),
      licenseMessage: document.getElementById('licenseMessage'),
      licenseBuildInfo: document.getElementById('licenseBuildInfo'),
      emailSetupSection: document.getElementById('emailSetupSection'),
      invoiceId: document.getElementById('invoiceId'),
      liveClock: document.getElementById('liveClock'),
      liveTimeZone: document.getElementById('liveTimeZone'),
      appVersionText: document.getElementById('appVersionText'),
      trialStatusText: document.getElementById('trialStatusText'),
      adminLoginButton: document.getElementById('adminLoginButton'),
      updateInlineButton: document.getElementById('updateInlineButton'),
      supportButton: document.getElementById('supportButton'),
      invoiceDate: document.getElementById('invoiceDate'),
      senderName: document.getElementById('senderName'),
      clientName: document.getElementById('clientName'),
	      clientEmail: document.getElementById('clientEmail'),
      ccEmail: document.getElementById('ccEmail'),
      recipientName: document.getElementById('recipientName'),
	      noteText: document.getElementById('noteText'),
      emailjsPublicKey: document.getElementById('emailjsPublicKey'),
      emailjsServiceId: document.getElementById('emailjsServiceId'),
      emailjsTemplateId: document.getElementById('emailjsTemplateId'),
      googleDriveClientId: document.getElementById('googleDriveClientId'),
	      taskName: document.getElementById('taskName'),
      taskNameHistoryList: document.getElementById('taskNameHistoryList'),
      taskDescription: document.getElementById('taskDescription'),
      taskDescriptionHistoryList: document.getElementById('taskDescriptionHistoryList'),
      taskCategory: document.getElementById('taskCategory'),
      taskCategoryHistoryList: document.getElementById('taskCategoryHistoryList'),
      clearCustomHistoryButton: document.getElementById('clearCustomHistoryButton'),
      transactionHistoryButton: document.getElementById('transactionHistoryButton'),
      transactionHistoryPanel: document.getElementById('transactionHistoryPanel'),
      closeTransactionHistoryButton: document.getElementById('closeTransactionHistoryButton'),
      transactionHistorySearch: document.getElementById('transactionHistorySearch'),
      transactionHistoryList: document.getElementById('transactionHistoryList'),
      taskRate: document.getElementById('taskRate'),
	      taskStart: document.getElementById('taskStart'),
	      taskEnd: document.getElementById('taskEnd'),
      taskHours: document.getElementById('taskHours'),
      taskQuantity: document.getElementById('taskQuantity'),
      taskAmountPreview: document.getElementById('taskAmountPreview'),
      taskScreenshots: document.getElementById('taskScreenshots'),
      testUploadTrigger: document.getElementById('testUploadTrigger'),
      testUploadInput: document.getElementById('testUploadInput'),
      testUploadIndicator: document.getElementById('testUploadIndicator'),
	      uploadTrigger: document.getElementById('uploadTrigger'),
	      fileIndicator: document.getElementById('fileIndicator'),
      saveTaskButton: document.getElementById('saveTaskButton'),
      resetTaskButton: document.getElementById('resetTaskButton'),
      taskEditor: document.getElementById('taskEditor'),
      taskEditorAlert: document.getElementById('taskEditorAlert'),
      shareInvoiceButton: document.getElementById('shareInvoiceButton'),
      sendInvoiceButton: document.getElementById('sendInvoiceButton'),
      sendTestEmailButton: document.getElementById('sendTestEmailButton'),
	      exportPdfButton: document.getElementById('exportPdfButton'),
	      wiseLink: document.getElementById('wiseLink'),
	      invoicePreviewText: document.getElementById('invoicePreviewText'),
      invoicePreviewLogo: document.getElementById('invoicePreviewLogo'),
      invoiceFileLinks: document.getElementById('invoiceFileLinks'),
	      categorySubtotals: document.getElementById('categorySubtotals'),
	      grandTotal: document.getElementById('grandTotal'),
	      toast: document.getElementById('toast'),
	      clientHistoryList: document.getElementById('clientHistoryList'),
	      emailHistoryList: document.getElementById('emailHistoryList'),
		    };

    const readHistory = (key) => {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    };

    const writeHistory = (key, list) => {
      localStorage.setItem(key, JSON.stringify(list.slice(0, MAX_HISTORY_ITEMS)));
    };

    const readDownloadHistory = () => {
      try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_DOWNLOAD_HISTORY_KEY) || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    };

    const writeDownloadHistory = (list) => {
      localStorage.setItem(
        STORAGE_DOWNLOAD_HISTORY_KEY,
        JSON.stringify(list.slice(0, MAX_DOWNLOAD_HISTORY_ITEMS)),
      );
    };

    const saveDownloadHistoryEntry = (entry) => {
      const invoiceId = String(entry?.invoiceId || elements.invoiceId.value || 'DRAFT').trim() || 'DRAFT';
      const next = {
        id: `hist-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        source: String(entry?.source || 'unknown'),
        invoiceId,
        invoiceDate: elements.invoiceDate.value || new Date().toISOString().slice(0, 10),
        clientName: elements.clientName.value.trim() || getRecipientDisplayName() || '-',
        recipientEmail: getRecipientEmailText() || '-',
        total: elements.grandTotal.textContent || '$0.00',
        pdfDataUrl: entry?.pdfDataUrl || '',
        pdfName: entry?.pdfName || `${invoiceId}.pdf`,
        htmlDataUrl: entry?.htmlDataUrl || '',
        htmlName: entry?.htmlName || `${invoiceId}-invoice-copy.html`,
      };
      const history = readDownloadHistory();
      history.unshift(next);
      writeDownloadHistory(history);
      renderDownloadHistory();
    };

    const downloadDataUrlFile = (dataUrl, filename) => {
      if (!dataUrl) return false;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = filename || 'invoice-file';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    };

    const openHtmlDataUrlPreview = (dataUrl) => {
      if (!dataUrl || typeof dataUrl !== 'string') return false;
      try {
        const commaIndex = dataUrl.indexOf(',');
        if (commaIndex < 0) return false;
        const meta = dataUrl.slice(0, commaIndex).toLowerCase();
        if (!meta.includes('text/html')) return false;
        const payload = dataUrl.slice(commaIndex + 1);
        const html = meta.includes(';base64')
          ? atob(payload)
          : decodeURIComponent(payload);
        const previewWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (!previewWindow) return false;
        previewWindow.document.open();
        previewWindow.document.write(html);
        previewWindow.document.close();
        return true;
      } catch (error) {
        return false;
      }
    };

    const cleanupStrayScriptTextNodes = () => {
      // Defensive cleanup: if any JS source text is accidentally rendered as a text node,
      // strip it from visible UI without touching normal content.
      const looksLikeJsSource = (text) => {
        const value = String(text || '').trim();
        if (value.length < 120) return false;
        return (
          value.includes('const ') &&
          value.includes('=>') &&
          (value.includes('elements.') || value.includes('state.') || value.includes('function'))
        );
      };

      const pruneIn = (root) => {
        if (!root) return;
        const textNodes = Array.from(root.childNodes || []).filter((node) => node.nodeType === Node.TEXT_NODE);
        textNodes.forEach((node) => {
          if (looksLikeJsSource(node.textContent)) {
            node.remove();
          }
        });
      };

      pruneIn(document.body);
      pruneIn(elements?.invoicePreviewSection);
    };

    const renderDownloadHistory = () => {
      if (!elements.transactionHistoryList) return;
      const history = readDownloadHistory();
      const keyword = String(elements.transactionHistorySearch?.value || '').trim().toLowerCase();
      const filteredHistory = keyword
        ? history.filter((item) => String(item?.invoiceId || '').toLowerCase().includes(keyword))
        : history;
      const activeHistory = filteredHistory;
      const historyIds = new Set(activeHistory.map((item) => String(item.id)));
      state.historySelectedIds = (state.historySelectedIds || []).filter((id) => historyIds.has(id));
      if (!activeHistory.length) {
        elements.transactionHistoryList.innerHTML = '<small style="color:#6b7280;">No transaction history yet. New exports/sends (including test sends) will appear here from now on.</small>';
        return;
      }
      const visibleItems = state.historyShowAll ? activeHistory : activeHistory.slice(0, 3);
      const visibleIds = visibleItems.map((item) => String(item.id));
      const selectedSet = new Set(state.historySelectedIds || []);
      const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedSet.has(id));
      const rows = visibleItems.map((item) => {
        const invoiceId = escapeHtml(item.invoiceId || 'DRAFT');
        const invoiceDate = escapeHtml(item.invoiceDate || '-');
        const historyId = escapeHtml(item.id);
        const isChecked = selectedSet.has(String(item.id)) ? 'checked' : '';
        const pdfBtn = item.pdfDataUrl
          ? `<button class="button tiny" type="button" data-history-action="pdf" data-history-id="${historyId}">&#x2B07; PDF</button>`
          : `<button class="button tiny" type="button" disabled title="PDF not available">&#x2B07; PDF</button>`;
        const htmlBtn = item.htmlDataUrl
          ? `<button class="button tiny" type="button" data-history-action="html" data-history-id="${historyId}">Preview HTML</button>`
          : `<button class="button tiny" type="button" disabled title="HTML not available">Preview HTML</button>`;
        const eraseBtn = `<button class="button tiny" type="button" data-history-action="erase" data-history-id="${historyId}">Erase</button>`;
        return `<div style="padding:8px 0;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;"><div style="display:flex;align-items:center;gap:8px;min-width:0;flex-wrap:nowrap;"><input type="checkbox" data-history-check="${historyId}" ${isChecked} /><span style="font-weight:700;white-space:nowrap;word-break:normal;overflow-wrap:normal;">${invoiceId}</span><small style="color:#6b7280;white-space:nowrap;word-break:normal;overflow-wrap:normal;">${invoiceDate}</small></div><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">${pdfBtn}${htmlBtn}${eraseBtn}</div></div>`;
      }).join('');
      const toolbar = `<div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;"><label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#374151;"><input type="checkbox" data-history-action="toggle-all" ${allVisibleSelected ? 'checked' : ''} /> Select all</label><button class="button tiny" type="button" data-history-action="erase-selected" ${(state.historySelectedIds || []).length ? '' : 'disabled'}>Erase selected</button></div>`;
      const seeMoreBtn = activeHistory.length > 3
        ? `<div style="margin-top:10px;display:flex;justify-content:center;"><button class="button tiny" style="min-width:140px;" type="button" data-history-action="toggle-more">${state.historyShowAll ? 'Show less' : 'See more'}</button></div>`
        : '';
      elements.transactionHistoryList.innerHTML = `${toolbar}${rows}${seeMoreBtn}`;
    };

    const toggleTransactionHistoryPanel = () => {
      if (!elements.transactionHistoryPanel) return;
      const willShow = elements.transactionHistoryPanel.classList.contains('hidden');
      if (willShow) {
        state.historyShowAll = false;
        renderDownloadHistory();
        elements.transactionHistoryPanel.classList.remove('hidden');
        elements.transactionHistoryPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      elements.transactionHistoryPanel.classList.add('hidden');
    };

    const closeTransactionHistoryPanel = () => {
      if (!elements.transactionHistoryPanel) return;
      elements.transactionHistoryPanel.classList.add('hidden');
    };

    const readFormDraft = () => {
      try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_FORM_DRAFT_KEY) || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    };

    const persistFormDraft = () => {
      const draft = {
        senderName: elements.senderName.value,
        clientName: elements.clientName.value,
        clientEmail: elements.clientEmail.value,
        ccEmail: elements.ccEmail.value,
        recipientName: elements.recipientName.value,
        noteText: elements.noteText.value,
        wiseLink: elements.wiseLink.value,
      };
      localStorage.setItem(STORAGE_FORM_DRAFT_KEY, JSON.stringify(draft));
    };

    const loadFormDraft = () => {
      const draft = readFormDraft();
      const apply = (element, key) => {
        const value = draft[key];
        if (typeof value !== 'string') return;
        element.value = value;
      };
      apply(elements.senderName, 'senderName');
      apply(elements.clientName, 'clientName');
      apply(elements.clientEmail, 'clientEmail');
      apply(elements.ccEmail, 'ccEmail');
      apply(elements.recipientName, 'recipientName');
      apply(elements.noteText, 'noteText');
      apply(elements.wiseLink, 'wiseLink');
    };

    const updateHistoryList = (list, value) => {
      const clean = (value || '').trim();
      if (!clean) return list;
      const next = list.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      next.unshift(clean);
      return next.slice(0, MAX_HISTORY_ITEMS);
    };

    const renderHistoryOptions = () => {
      const clients = readHistory(STORAGE_CLIENTS_KEY);
      const emails = readHistory(STORAGE_EMAILS_KEY);
      const taskNames = readHistory(STORAGE_TASK_NAMES_KEY);
      const taskDescriptions = readHistory(STORAGE_TASK_DESCRIPTIONS_KEY);
      const taskCategories = readHistory(STORAGE_TASK_CATEGORIES_KEY);
      const mergedTaskNames = [...taskNames, ...DEFAULT_TASK_NAME_OPTIONS]
        .filter((name, index, arr) => arr.findIndex((item) => item.toLowerCase() === String(name).toLowerCase()) === index)
        .slice(0, 40);
      const mergedTaskDescriptions = [...taskDescriptions, ...DEFAULT_TASK_DESCRIPTION_OPTIONS]
        .filter((item, index, arr) => arr.findIndex((entry) => entry.toLowerCase() === String(item).toLowerCase()) === index)
        .slice(0, 40);
      const mergedTaskCategories = [...taskCategories, ...DEFAULT_TASK_CATEGORY_OPTIONS]
        .filter((item, index, arr) => arr.findIndex((entry) => entry.toLowerCase() === String(item).toLowerCase()) === index)
        .slice(0, 40);
      elements.clientHistoryList.innerHTML = clients.map((item) => `<option value="${item}"></option>`).join('');
      elements.emailHistoryList.innerHTML = emails.map((item) => `<option value="${item}"></option>`).join('');
      elements.taskNameHistoryList.innerHTML = mergedTaskNames.map((item) => `<option value="${item}"></option>`).join('');
      elements.taskDescriptionHistoryList.innerHTML = mergedTaskDescriptions.map((item) => `<option value="${item}"></option>`).join('');
      elements.taskCategoryHistoryList.innerHTML = mergedTaskCategories.map((item) => `<option value="${item}"></option>`).join('');
    };

    const resetGoogleAdvancedState = () => {
      localStorage.removeItem(STORAGE_GOOGLE_SHEET_ID);
      state.driveFolderUrl = '';
      state.invoiceWebCopyUrl = '';
      state.transactionSheetUrl = '';
    };

    const loadEmailJsSettings = () => {
      elements.emailjsPublicKey.value = localStorage.getItem(STORAGE_EMAILJS_PUBLIC_KEY) || DEFAULT_EMAILJS_PUBLIC_KEY;
      elements.emailjsServiceId.value = localStorage.getItem(STORAGE_EMAILJS_SERVICE_ID) || DEFAULT_EMAILJS_SERVICE_ID;
      elements.emailjsTemplateId.value = localStorage.getItem(STORAGE_EMAILJS_TEMPLATE_ID) || DEFAULT_EMAILJS_TEMPLATE_ID;
      elements.googleDriveClientId.value = localStorage.getItem(STORAGE_DRIVE_CLIENT_ID) || DEFAULT_GOOGLE_DRIVE_CLIENT_ID;
    };

    const persistEmailJsSettings = () => {
      localStorage.setItem(STORAGE_EMAILJS_PUBLIC_KEY, elements.emailjsPublicKey.value.trim());
      localStorage.setItem(STORAGE_EMAILJS_SERVICE_ID, elements.emailjsServiceId.value.trim());
      localStorage.setItem(STORAGE_EMAILJS_TEMPLATE_ID, elements.emailjsTemplateId.value.trim());
      localStorage.setItem(STORAGE_DRIVE_CLIENT_ID, elements.googleDriveClientId.value.trim());
      localStorage.removeItem(STORAGE_GOOGLE_SHEET_ID);
    };

    const getStoredSheetId = () => localStorage.getItem(STORAGE_GOOGLE_SHEET_ID) || '';
    const setStoredSheetId = (value) => localStorage.setItem(STORAGE_GOOGLE_SHEET_ID, String(value || '').trim());

    const verifyBuildIntegrity = () => {
      const current = `${APP_BUILD_ROLE}|${APP_VERSION}|${APP_KEY_VERSION}|${APP_DISTRIBUTION_ID}`;
      return current === BUILD_INTEGRITY_PROOF;
    };

    const getTrialSendCount = () => {
      const raw = Number(localStorage.getItem(STORAGE_TRIAL_SEND_COUNT) || '0');
      return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
    };

    const setTrialSendCount = (value) => {
      const next = Math.max(0, Math.floor(Number(value) || 0));
      localStorage.setItem(STORAGE_TRIAL_SEND_COUNT, String(next));
    };

    const isTrialExhausted = () => getTrialSendCount() >= TRIAL_SEND_LIMIT;

    const renderTrialStatus = () => {
      if (!elements.trialStatusText) return;
      const used = getTrialSendCount();
      const left = Math.max(0, TRIAL_SEND_LIMIT - used);
      elements.trialStatusText.textContent = `Trial left: ${left}/${TRIAL_SEND_LIMIT} • App ID: ${APP_DISTRIBUTION_ID}`;
    };

    const showTrialLockedPopup = () => {
      const message = `Trial limit reached (${TRIAL_SEND_LIMIT}/${TRIAL_SEND_LIMIT}). Purchase full app to continue.\nApp ID: ${APP_DISTRIBUTION_ID}`;
      const goBuy = window.confirm(`${message}\n\nClick OK to open purchase page.`);
      if (goBuy && GUMROAD_UPDATE_URL) {
        window.open(GUMROAD_UPDATE_URL, '_blank', 'noopener,noreferrer');
      }
    };

    const applyTamperLock = () => {
      state.tamperLocked = true;
      localStorage.removeItem(STORAGE_LICENSE_KEY);
      setLicensedState(false);
      elements.licenseMessage.textContent = `Security lock: modified/invalid build detected. Share App ID ${APP_DISTRIBUTION_ID} with support.`;
      updateButtons();
    };

    const focusEmailSetup = (suggestSignup = false) => {
      if (elements.emailSetupSection) {
        elements.emailSetupSection.open = true;
        elements.emailSetupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (suggestSignup) {
        const go = window.confirm('Email sending setup is required. Create your free EmailJS account now?');
        if (go) {
          window.open('https://dashboard.emailjs.com/sign-up', '_blank', 'noopener,noreferrer');
        }
      }
    };

    const normalizeLicenseKey = (value) => String(value || '')
      .normalize('NFKC')
      .replace(/[\u2010-\u2015\u2212]/g, '-')
      .replace(/[^A-Za-z0-9-]/g, '')
      .trim()
      .toUpperCase();
    const isLicenseKeyValid = (key) => {
      const normalized = normalizeLicenseKey(key);
      if (normalized === REQUIRED_BUYER_KEY) return true;
      if (VALID_LICENSE_KEYS.includes(normalized)) return true;
      return /^INVPRO-2026-\d{4}-[A-Z0-9]{6,8}$/.test(normalized);
    };
    const setLicensedState = (licensed) => {
      state.licensed = licensed;
      document.body.classList.toggle('app-locked', !licensed);
      document.body.classList.toggle('app-unlocked', licensed);
    };
    const unlockApp = () => {
      if (state.tamperLocked) {
        elements.licenseMessage.textContent = `Security lock active. Contact support and share App ID ${APP_DISTRIBUTION_ID}.`;
        return;
      }
      const raw = elements.licenseKeyInput.value;
      const normalized = normalizeLicenseKey(raw);
      if (normalized === 'INVADMIN-2026-MAIN' || normalized.startsWith('INVADMIN-')) {
        elements.licenseMessage.textContent = 'Admin key works only in owner app (invoice.html).';
        return;
      }
      if (!isLicenseKeyValid(normalized)) {
        elements.licenseMessage.textContent = 'Invalid license key. Please check and try again.';
        return;
      }
      localStorage.setItem(STORAGE_LICENSE_KEY, normalized);
      elements.licenseMessage.textContent = normalized === REQUIRED_BUYER_KEY
        ? `License activated for App ID ${APP_DISTRIBUTION_ID}.`
        : 'Legacy key accepted.';
      setLicensedState(true);
      renderTrialStatus();
    };
    const loadLicenseState = () => {
      if (state.tamperLocked) {
        setLicensedState(false);
        return;
      }
      // Buyer preview mode: app opens for everyone without a license key.
      setLicensedState(true);
    };

    const persistTaskNameHistory = () => {
      const taskNameValue = elements.taskName.value.trim();
      if (!taskNameValue) return;
      const names = updateHistoryList(readHistory(STORAGE_TASK_NAMES_KEY), taskNameValue);
      writeHistory(STORAGE_TASK_NAMES_KEY, names);
      renderHistoryOptions();
    };

    const persistTaskDescriptionHistory = () => {
      const taskDescriptionValue = elements.taskDescription.value.trim();
      if (!taskDescriptionValue) return;
      const descriptions = updateHistoryList(readHistory(STORAGE_TASK_DESCRIPTIONS_KEY), taskDescriptionValue);
      writeHistory(STORAGE_TASK_DESCRIPTIONS_KEY, descriptions);
      renderHistoryOptions();
    };

    const persistTaskCategoryHistory = () => {
      const taskCategoryValue = elements.taskCategory.value.trim();
      if (!taskCategoryValue) return;
      const categories = updateHistoryList(readHistory(STORAGE_TASK_CATEGORIES_KEY), taskCategoryValue);
      writeHistory(STORAGE_TASK_CATEGORIES_KEY, categories);
      renderHistoryOptions();
    };

    const persistClientHistory = () => {
      const clientValue = elements.clientName.value.trim();
      const emailValues = [...getRecipientEmails(), ...getCcEmails()];
      if (clientValue) {
        const clients = updateHistoryList(readHistory(STORAGE_CLIENTS_KEY), clientValue);
        writeHistory(STORAGE_CLIENTS_KEY, clients);
      }
      if (emailValues.length) {
        const emails = emailValues.reduce(
          (list, email) => updateHistoryList(list, email),
          readHistory(STORAGE_EMAILS_KEY),
        );
        writeHistory(STORAGE_EMAILS_KEY, emails);
      }
      renderHistoryOptions();
    };

    const clearCustomHistory = () => {
      localStorage.removeItem(STORAGE_TASK_NAMES_KEY);
      localStorage.removeItem(STORAGE_TASK_DESCRIPTIONS_KEY);
      localStorage.removeItem(STORAGE_TASK_CATEGORIES_KEY);
      localStorage.removeItem(STORAGE_CLIENTS_KEY);
      localStorage.removeItem(STORAGE_EMAILS_KEY);
      renderHistoryOptions();
      showToast('History erased');
    };

    const generateNextInvoiceId = () => {
      let usedList = [];
      try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_USED_INVOICE_IDS_KEY) || '[]');
        usedList = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        usedList = [];
      }
      const usedIds = new Set(usedList);
      let seq = Number(localStorage.getItem(STORAGE_INVOICE_SEQ_KEY) || '1');
      const year = new Date().getFullYear();
      let nextId = '';
      do {
        nextId = `INV-${year}-${String(seq).padStart(5, '0')}`;
        seq += 1;
      } while (usedIds.has(nextId));
      localStorage.setItem(STORAGE_INVOICE_SEQ_KEY, String(seq));
      usedIds.add(nextId);
      localStorage.setItem(STORAGE_USED_INVOICE_IDS_KEY, JSON.stringify(Array.from(usedIds)));
      return nextId;
    };

    const showToast = (message) => {
      elements.toast.textContent = message;
      elements.toast.classList.add('show');
      window.clearTimeout(elements.toast._timeout);
      elements.toast._timeout = window.setTimeout(() => {
        elements.toast.classList.remove('show');
      }, 2100);
    };

    const updateLiveClock = () => {
      if (!elements.liveClock) return;
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const time = now.toLocaleTimeString('en-US', { hour12: true });
      elements.liveClock.textContent = `${date} • ${time}`;
      if (elements.liveTimeZone) {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
        elements.liveTimeZone.textContent = `Timezone: ${zone}`;
      }
    };

    const renderBuildOwnerStatus = () => {
      if (APP_BUILD_ROLE !== 'OWNER') {
        if (elements.adminLoginButton) elements.adminLoginButton.classList.add('hidden');
        if (elements.supportButton) elements.supportButton.classList.add('hidden');
        return;
      }
      if (elements.adminLoginButton) {
        elements.adminLoginButton.classList.remove('hidden');
        elements.adminLoginButton.textContent = state.adminUnlocked ? 'Admin Logout' : 'Admin Login';
        elements.adminLoginButton.title = state.adminUnlocked ? 'Logout owner admin mode' : 'Owner admin access';
      }
      if (elements.supportButton) {
        elements.supportButton.classList.toggle('hidden', !state.adminUnlocked);
        elements.supportButton.classList.toggle('notify-flash', state.adminUnlocked);
      }
    };

    const loadAdminState = () => {
      state.adminUnlocked = localStorage.getItem(STORAGE_ADMIN_UNLOCKED) === '1';
      renderBuildOwnerStatus();
    };

    const toggleAdminLogin = () => {
      if (APP_BUILD_ROLE !== 'OWNER') return;
      if (state.adminUnlocked) {
        state.adminUnlocked = false;
        localStorage.removeItem(STORAGE_ADMIN_UNLOCKED);
        renderBuildOwnerStatus();
        showToast('Admin mode locked');
        return;
      }
      const input = window.prompt('Enter owner admin code');
      const code = String(input || '').trim();
      if (!code) return;
      if (code !== ADMIN_OWNER_CODE) {
        showToast('Invalid admin code');
        return;
      }
      state.adminUnlocked = true;
      localStorage.setItem(STORAGE_ADMIN_UNLOCKED, '1');
      renderBuildOwnerStatus();
      showToast('Admin mode unlocked');
    };

    const parseVersion = (value) => String(value || '')
      .split('.')
      .map((part) => Number.parseInt(part, 10))
      .map((part) => (Number.isFinite(part) ? part : 0));

    const compareVersions = (a, b) => {
      const left = parseVersion(a);
      const right = parseVersion(b);
      const max = Math.max(left.length, right.length);
      for (let i = 0; i < max; i += 1) {
        const l = left[i] || 0;
        const r = right[i] || 0;
        if (l > r) return 1;
        if (l < r) return -1;
      }
      return 0;
    };

    const getEffectiveUpdateInfo = () => {
      const remote = state.remoteUpdate || {};
      const latestVersion = String(remote.latestVersion || LATEST_AVAILABLE_VERSION || '').trim();
      const updateUrl = String(remote.updateUrl || GUMROAD_UPDATE_URL || '').trim();
      const message = String(remote.message || '').trim();
      return { latestVersion, updateUrl, message };
    };

    const renderUpdateNotice = () => {
      if (elements.appVersionText) {
        elements.appVersionText.textContent = `Invoice Studio v${APP_VERSION} • ${APP_DISTRIBUTION_ID}`;
      }
      const info = getEffectiveUpdateInfo();
      const latestVersion = info.latestVersion;
      const updateUrl = info.updateUrl;
      const dismissed = localStorage.getItem(STORAGE_UPDATE_DISMISSED_VERSION) || '';
      const hasNewer = latestVersion && compareVersions(latestVersion, APP_VERSION) > 0;
      const canLink = /^https?:\/\//i.test(updateUrl);
      const show = hasNewer && dismissed !== latestVersion && canLink;
      if (!elements.updateInlineButton) return;
      if (!show) {
        elements.updateInlineButton.classList.add('hidden');
        elements.updateInlineButton.classList.remove('notify-flash');
        return;
      }
      elements.updateInlineButton.textContent = `Update v${latestVersion}`;
      elements.updateInlineButton.href = updateUrl;
      elements.updateInlineButton.title = info.message || `New version v${latestVersion} available`;
      elements.updateInlineButton.classList.remove('hidden');
      elements.updateInlineButton.classList.add('notify-flash');
    };

    const loadRemoteUpdateManifest = async () => {
      const source = String(UPDATE_MANIFEST_URL || '').trim();
      if (!/^https?:\/\//i.test(source)) return;
      try {
        const url = source.includes('?') ? `${source}&t=${Date.now()}` : `${source}?t=${Date.now()}`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        state.remoteUpdate = {
          latestVersion: String(data?.latestVersion || '').trim(),
          updateUrl: String(data?.updateUrl || '').trim(),
          message: String(data?.message || '').trim(),
        };
        renderUpdateNotice();
      } catch (error) {
        // fallback to local constants
      }
    };

    const formatMoney = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    const getUserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
    const getTimestampWithZone = () => `${new Date().toLocaleString()} (${getUserTimeZone()})`;
    const escapeHtml = (value) => String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const parseCommaSeparatedList = (value) => {
      const seen = new Set();
      return String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter((item) => {
          if (!item) return false;
          const lowered = item.toLowerCase();
          if (seen.has(lowered)) return false;
          seen.add(lowered);
          return true;
        });
    };

    const isValidEmailAddress = (value) => /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(String(value || '').trim());
    const getRecipientEmails = () => parseCommaSeparatedList(elements.clientEmail.value);
    const getCcEmails = () => parseCommaSeparatedList(elements.ccEmail.value);
    const getRecipientEmailText = () => getRecipientEmails().join(', ');
    const getCcEmailText = () => getCcEmails().join(', ');
    const getPrimaryRecipientEmail = () => getRecipientEmails()[0] || '';
    const getRecipientDisplayName = () => (elements.recipientName.value || elements.clientName.value).trim();
    const isHttpUrl = (value) => /^https?:\/\//i.test(String(value || '').trim());
    const isDbImageUrl = (value) => /[?&]imageId=[A-Za-z0-9_-]+/i.test(String(value || '').trim());
    const isOpenableFileUrl = (value) => isHttpUrl(value) || isDbImageUrl(value);

    const openImageDatabase = () => new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this browser'));
        return;
      }
      const request = window.indexedDB.open(IMAGE_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IMAGE_DB_STORE)) {
          db.createObjectStore(IMAGE_DB_STORE, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Failed to open image database'));
    });

    const withImageStore = async (mode, action) => {
      const db = await openImageDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(IMAGE_DB_STORE, mode);
        const store = tx.objectStore(IMAGE_DB_STORE);
        let actionResult;
        tx.oncomplete = () => resolve(actionResult);
        tx.onerror = () => reject(tx.error || new Error('Image database transaction failed'));
        tx.onabort = () => reject(tx.error || new Error('Image database transaction aborted'));
        Promise.resolve()
          .then(() => action(store, tx))
          .then((value) => {
            actionResult = value;
          })
          .catch((error) => reject(error));
      }).finally(() => db.close());
    };

    const getDbImageRecord = async (id) => withImageStore('readonly', (store) => new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Failed to read image record'));
    }));

    const buildDbImageUrl = (id) => {
      const url = new URL(window.location.href);
      url.searchParams.set('imageId', id);
      return url.toString();
    };

    const saveFileToImageDatabase = async (file) => {
      const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const record = {
        id,
        name: file?.name || 'file',
        type: file?.type || 'application/octet-stream',
        size: Number(file?.size || 0),
        createdAt: new Date().toISOString(),
        blob: file,
      };
      await withImageStore('readwrite', (store) => {
        store.put(record);
      });
      return {
        id,
        name: record.name,
        type: record.type,
        url: buildDbImageUrl(id),
      };
    };

    const openImageFromQuery = async () => {
      const params = new URLSearchParams(window.location.search || '');
      const imageId = String(params.get('imageId') || '').trim();
      if (!imageId) return;
      try {
        const record = await getDbImageRecord(imageId);
        if (!record || !record.blob) throw new Error('Image not found in local database');
        const objectUrl = URL.createObjectURL(record.blob);
        window.location.replace(objectUrl);
      } catch (error) {
        showToast(error?.message || 'Unable to open image link');
      }
    };

    const hasHostedUploadConfigured = () => Boolean(String(PUBLIC_IMAGE_UPLOAD_ENDPOINT || '').trim());

    const uploadFileToHostedStorage = async (file) => {
      const endpoint = String(PUBLIC_IMAGE_UPLOAD_ENDPOINT || '').trim();
      if (!endpoint) throw new Error('Hosted upload endpoint is not configured');
      const formData = new FormData();
      formData.append('file', file, file?.name || 'upload');
      formData.append('source', 'invoice-buyer-app');
      formData.append('invoiceId', elements.invoiceId.value.trim() || 'DRAFT');
      const headers = {};
      const token = String(PUBLIC_IMAGE_UPLOAD_AUTH_TOKEN || '').trim();
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: formData,
      });
      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (error) {
        data = {};
      }
      if (!response.ok) {
        const message = String(data?.error || data?.message || text || `Upload failed with status ${response.status}`).trim();
        throw new Error(message);
      }
      const url = String(
        data?.url ||
        data?.secure_url ||
        data?.publicUrl ||
        data?.download_url ||
        '',
      ).trim();
      if (!url || !/^https?:\/\//i.test(url)) {
        throw new Error('Upload response missing a valid public URL');
      }
      return {
        name: String(data?.name || file?.name || 'file').trim() || 'file',
        type: String(data?.type || file?.type || '').trim(),
        url,
      };
    };

    const buildTaskFileLinks = async (files) => {
      const incomingFiles = Array.isArray(files) ? files : [];
      const links = [];
      let hostedCount = 0;
      let localFallbackCount = 0;
      for (const file of incomingFiles) {
        if (hasHostedUploadConfigured()) {
          try {
            const hosted = await uploadFileToHostedStorage(file);
            links.push(hosted);
            hostedCount += 1;
            continue;
          } catch (error) {
            // fallback to local db link so buyer can continue
          }
        }
        try {
          const local = await saveFileToImageDatabase(file);
          links.push(local);
          localFallbackCount += 1;
        } catch (error) {
          links.push({
            name: file?.name || 'file',
            url: URL.createObjectURL(file),
            type: file?.type || '',
          });
          localFallbackCount += 1;
        }
      }
      return { links, hostedCount, localFallbackCount };
    };

    const finalNote = () => {
      const base = elements.noteText.value.trim() || DEFAULT_NOTE;
      const signer = elements.senderName.value.trim() || 'Invoice Team';
      return `${base}\n\nThanks,\n${signer}`;
    };

    const getPromoLink = () => {
      const raw = String(INVOICE_APP_PROMO_URL || '').trim();
      return /^https?:\/\//i.test(raw) ? raw : '#';
    };

    const getPromoEmailText = () => {
      const raw = String(INVOICE_APP_PROMO_URL || '').trim();
      return /^https?:\/\//i.test(raw) ? raw : '';
    };

    const composeEmailMessage = ({ isTest = false, recipient = '' } = {}) => {
      const who = String(recipient || getRecipientDisplayName() || 'Client').trim();
      const invoiceId = elements.invoiceId.value.trim() || 'DRAFT';
      const invoiceDate = elements.invoiceDate.value || '-';
      const sender = elements.senderName.value.trim() || 'Invoice Team';
      const buyerAccount = elements.clientName.value.trim() || who;
      const paymentLink = getValidPaymentLink() || 'Not provided';
      const lines = [];

      if (isTest) lines.push('[TEST EMAIL]');
      lines.push(`Hello ${who},`);
      lines.push('');
      lines.push('Please find your invoice summary below:');
      lines.push(`Invoice ID: ${invoiceId}`);
      lines.push(`Date: ${invoiceDate}`);
      lines.push(`From: ${sender}`);
      lines.push(`Buyer account: ${buyerAccount}`);
      lines.push(`Grand total: ${elements.grandTotal.textContent || '$0.00'}`);
      lines.push(`Payment link: ${paymentLink}`);
      lines.push('');
      if (!state.tasks.length) {
        lines.push('Task summary: No tasks added yet.');
      } else {
        lines.push('Task summary:');
        state.tasks.forEach((task, index) => {
          lines.push(`${index + 1}. ${task.name || '-'} (${task.category || '-'})`);
          lines.push(`   ${task.start || '-'} to ${task.end || '-'} | ${task.hours || 0}h x ${task.quantity || 0} @ ${formatMoney(task.rate || 0)}/hr = ${formatMoney(computeSubtotal(task.hours, task.quantity, task.rate))}`);
        });
      }
      lines.push('');
      lines.push(finalNote());
      return lines.join('\n');
    };

    const composeEmailHtml = ({ isTest = false, recipient = '' } = {}) => {
      const who = escapeHtml(String(recipient || getRecipientDisplayName() || 'Client').trim());
      const invoiceId = escapeHtml(elements.invoiceId.value.trim() || 'DRAFT');
      const invoiceDate = escapeHtml(elements.invoiceDate.value || '-');
      const sender = escapeHtml(elements.senderName.value.trim() || 'Invoice Team');
      const buyerAccount = escapeHtml(elements.clientName.value.trim() || String(recipient || getRecipientDisplayName() || 'Client').trim());
      const total = escapeHtml(elements.grandTotal.textContent || '$0.00');
      const paymentLink = getValidPaymentLink();
      const promoUrl = getPromoEmailText();
      const safePromoUrl = escapeHtml(promoUrl);
      const safePaymentUrl = escapeHtml(paymentLink);
      const grouped = groupTasks();
      const sectionTitle = isTest ? '<p style="margin:0 0 12px;color:#b91c1c;font-weight:700;">[TEST EMAIL]</p>' : '';

      const taskSections = Object.keys(grouped).length
        ? Object.keys(grouped).map((category) => {
          const rows = grouped[category].map((task, index) => `
            <tr>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${index + 1}</td>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${escapeHtml(task.name || '-')}</td>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${escapeHtml(task.start || '-')} to ${escapeHtml(task.end || '-')}</td>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${escapeHtml(String(task.hours || 0))}h x ${escapeHtml(String(task.quantity || 0))}</td>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${escapeHtml(formatMoney(task.rate || 0))}</td>
              <td style="border:1px solid #d1d5db;padding:6px;vertical-align:top;">${escapeHtml(formatMoney(computeSubtotal(task.hours, task.quantity, task.rate)))}</td>
            </tr>
          `).join('');
          return `
            <p style="margin:12px 0 6px;font-weight:700;">${escapeHtml(category)} (${grouped[category].length} tasks)</p>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <thead>
                <tr style="background:#f3f4f6;">
                  <th style="border:1px solid #d1d5db;padding:6px;">#</th>
                  <th style="border:1px solid #d1d5db;padding:6px;">Task</th>
                  <th style="border:1px solid #d1d5db;padding:6px;">Period</th>
                  <th style="border:1px solid #d1d5db;padding:6px;">Hours x Qty</th>
                  <th style="border:1px solid #d1d5db;padding:6px;">Rate</th>
                  <th style="border:1px solid #d1d5db;padding:6px;">Total</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          `;
        }).join('')
        : '<p style="margin:10px 0;">Task summary: No tasks added yet.</p>';

      const escapedFinalNote = escapeHtml(finalNote()).replace(/\n/g, '<br />');
      return `
        <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.55;font-size:14px;">
          ${sectionTitle}
          <p style="margin:0 0 10px;">Hello ${who},</p>
          <p style="margin:0 0 10px;">Please find your invoice summary below:</p>
          <div style="border:1px solid #d1d5db;border-radius:8px;padding:10px;background:#f9fafb;">
            <div><strong>Invoice ID:</strong> ${invoiceId}</div>
            <div><strong>Date:</strong> ${invoiceDate}</div>
            <div><strong>From:</strong> ${sender}</div>
            <div><strong>Buyer account:</strong> ${buyerAccount}</div>
            <div><strong>Grand total:</strong> ${total}</div>
            <div><strong>Payment link:</strong> ${paymentLink ? `<a href="${safePaymentUrl}" target="_blank" rel="noreferrer">${safePaymentUrl}</a>` : 'Not provided'}</div>
          </div>
          ${taskSections}
          <p style="margin:12px 0 0;white-space:pre-line;">${escapedFinalNote}</p>
          ${promoUrl ? `<p style="margin:12px 0 0;">Download Invoice Studio: <a href="${safePromoUrl}" target="_blank" rel="noreferrer">link here</a></p>` : ''}
        </div>
      `.trim();
    };

    const getInvoiceHeaderLines = () => ([
      'STATEMENT',
      '------------------------------',
    ]);

    const firstWordFileName = (name) => {
      const stripped = String(name || '').replace(/\.[^.]+$/, '').trim();
      if (!stripped) return 'file';
      const token = stripped.split(/[\s._-]+/).find(Boolean);
      return token || stripped;
    };

    const fileIdentity = (file) => `${file.name || ''}::${file.size || 0}::${file.lastModified || 0}`;

    const getAcceptedFiles = (incomingFiles) => {
      const accepted = Array.from(incomingFiles || []).filter((file) => {
        const ext = String(file?.name || '').toLowerCase();
        return file && (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg' || ext.endsWith('.pdf') || ext.endsWith('.png') || ext.endsWith('.jpg') || ext.endsWith('.jpeg'));
      });
      return accepted;
    };

    const appendUniqueFiles = (targetFiles, incomingFiles) => {
      const accepted = getAcceptedFiles(incomingFiles);
      if (!accepted.length) return;
      const existing = new Set((targetFiles || []).map(fileIdentity));
      accepted.forEach((file) => {
        const key = fileIdentity(file);
        if (!existing.has(key)) {
          targetFiles.push(file);
          existing.add(key);
        }
      });
    };

    const appendFiles = (incomingFiles) => {
      appendUniqueFiles(state.formFiles, incomingFiles);
    };

    const appendTestUploadFiles = (incomingFiles) => {
      appendUniqueFiles(state.testUploadFiles, incomingFiles);
    };

    const updateIndicator = (targetElement, files, emptyText, removeAttr) => {
      const names = (files || []).map((file) => file.name || 'file');
      if (!names.length) {
        targetElement.textContent = emptyText;
        targetElement.title = '';
        return;
      }
      const labels = names.map(firstWordFileName);
      targetElement.innerHTML = labels
        .map((label, index) => `<span>${label}<button type="button" ${removeAttr}="${index}" aria-label="Remove file">x</button></span>`)
        .join('');
      targetElement.title = names.join(', ');
    };

    const updateFileIndicator = () => {
      updateIndicator(elements.fileIndicator, state.formFiles, 'No file attached.', 'data-file-index');
    };

    const updateTestUploadIndicator = () => {
      updateIndicator(elements.testUploadIndicator, state.testUploadFiles, 'No test file attached.', 'data-test-file-index');
    };

    const computeSubtotal = (hours, quantity = 1, rate = DEFAULT_RATE) =>
      (Number(hours) || 0) * (Number(quantity) || 0) * (Number(rate) || 0);

    const listAttachmentNames = () => state.tasks
      .flatMap((task) => (task.screenshots || []))
      .filter(Boolean);

    const getCurrentRate = () => Number(elements.taskRate.value || 0);

    const addDaysToIsoDate = (isoDate, days) => {
      const parts = String(isoDate || '').split('-').map((part) => Number(part));
      if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return '';
      const [year, month, day] = parts;
      const date = new Date(Date.UTC(year, month - 1, day));
      if (Number.isNaN(date.getTime())) return '';
      date.setUTCDate(date.getUTCDate() + Number(days || 0));
      return date.toISOString().slice(0, 10);
    };

    const getValidPaymentLink = () => {
      const raw = elements.wiseLink.value.trim();
      if (!raw) return '';
      let candidate = raw;
      const hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(candidate);
      if (!hasProtocol && /^[\w.-]+\.[a-z]{2,}/i.test(candidate)) {
        candidate = `https://${candidate}`;
      }
      try {
        const parsed = new URL(candidate);
        const protocolOk = parsed.protocol === 'https:' || parsed.protocol === 'http:';
        const blockedHost = /(mail\.google\.com|gmail\.com|127\.0\.0\.1|localhost)/i.test(parsed.hostname);
        if (!protocolOk || blockedHost) return '';
        return parsed.toString();
      } catch (error) {
        return '';
      }
    };

		    const isTaskValid = () => {
      const hasValidRate = Number(elements.taskRate.value || 0) > 0;
	      return elements.taskName.value && elements.taskDescription.value && elements.taskCategory.value && hasValidRate && elements.taskStart.value && elements.taskEnd.value && elements.taskHours.value && elements.taskQuantity.value;
	    };

    const getInvoiceReadinessIssues = () => {
      const issues = [];
      const recipientEmails = getRecipientEmails();
      const ccEmails = getCcEmails();
      if (!elements.invoiceId.value.trim()) issues.push('Invoice ID is required');
      if (!elements.invoiceDate.value) issues.push('Invoice date is required');
      if (!elements.senderName.value.trim()) issues.push('Sender name is required');
      if (!elements.clientName.value.trim()) issues.push('Buyer account name is required');
      if (!recipientEmails.length) {
        issues.push('At least one recipient email is required');
      } else if (!recipientEmails.every(isValidEmailAddress)) {
        issues.push('Recipient email format is invalid');
      }
      if (!ccEmails.every(isValidEmailAddress)) issues.push('CC email format is invalid');
      if (!elements.noteText.value.trim()) issues.push('Note is required');
      if (!getValidPaymentLink()) issues.push('Payment link is missing/invalid (example: https://wise.com/...)');
      if (!state.tasks.length) issues.push('Add at least one task');
      return issues;
    };

    const isInvoiceReady = () => getInvoiceReadinessIssues().length === 0;

    const renderTaskAmountPreview = () => {
      const subtotal = computeSubtotal(elements.taskHours.value, elements.taskQuantity.value, getCurrentRate());
      const actionLabel = state.editingIndex !== null ? 'Update' : 'Save';
      elements.taskAmountPreview.textContent = `Amount preview (before ${actionLabel}): ${formatMoney(subtotal)}`;
    };

    const autoPopulateTaskQuantityFromHours = () => {
      const hasHours = Number(elements.taskHours.value || 0) > 0;
      const quantityRaw = String(elements.taskQuantity.value || '').trim();
      if (!hasHours || quantityRaw) return;
      elements.taskQuantity.value = '1';
    };

    const autoPopulateTaskEndFromStart = () => {
      const start = String(elements.taskStart.value || '').trim();
      if (!start) return;
      const suggestedEnd = addDaysToIsoDate(start, 30);
      if (!suggestedEnd) return;
      const currentEnd = String(elements.taskEnd.value || '').trim();
      const canAutoApply = !currentEnd || currentEnd === state.lastAutoTaskEnd;
      if (!canAutoApply) return;
      elements.taskEnd.value = suggestedEnd;
      state.lastAutoTaskEnd = suggestedEnd;
    };

    const syncTaskDateFieldHints = () => {
      [elements.taskStart, elements.taskEnd].forEach((input) => {
        const field = input?.closest('.date-field');
        if (!field) return;
        field.classList.toggle('has-value', Boolean(input.value));
      });
    };

    const updateButtons = () => {
      const taskValid = isTaskValid();
      elements.saveTaskButton.disabled = !taskValid;
      elements.taskEditor.classList.toggle('invalid', !taskValid);
      elements.taskEditorAlert.textContent = taskValid ? '' : 'Complete required task fields before saving.';
      const trialLocked = isTrialExhausted();
      elements.sendInvoiceButton.disabled = state.tamperLocked ? true : trialLocked;
      const invoiceIssues = getInvoiceReadinessIssues();
      elements.sendInvoiceButton.title = state.tamperLocked
        ? 'Security lock active'
        : trialLocked
          ? `Trial limit reached (${TRIAL_SEND_LIMIT})`
          : (invoiceIssues.length ? invoiceIssues[0] : 'Send invoice');
      renderTaskAmountPreview();
      updateFileIndicator();
      updateTestUploadIndicator();
      syncTaskDateFieldHints();
      renderTrialStatus();
    };

    const groupTasks = () => {
      const groups = {};
      state.tasks.forEach((task, index) => {
        if (!groups[task.category]) groups[task.category] = [];
        groups[task.category].push({ ...task, index });
      });
      return groups;
    };

	    const renderSummary = () => {
	      const groups = groupTasks();
	      const sums = Object.keys(groups).map((category) => {
        const subtotal = groups[category].reduce((sum, item) => sum + computeSubtotal(item.hours, item.quantity, item.rate), 0);
	        return { category, subtotal, count: groups[category].length };
	      });

      elements.categorySubtotals.innerHTML = sums.map((group) => `
        <div class="summary-row">
          <div class="summary-row-left">
            <span>${escapeHtml(group.category)}</span>
          </div>
          <div class="summary-row-right">
            <strong>${formatMoney(group.subtotal)}</strong>
            <button
              type="button"
              class="summary-delete"
              data-delete-category="${escapeHtml(group.category)}"
              aria-label="Delete ${escapeHtml(group.category)}"
              title="Delete ${escapeHtml(group.category)}"
            >x</button>
          </div>
        </div>
      `).join('');

      const total = sums.reduce((sum, group) => sum + group.subtotal, 0);
      elements.grandTotal.textContent = formatMoney(total);
    };

	    const resetTaskForm = () => {
	      elements.taskName.value = '';
	      elements.taskDescription.value = '';
		      elements.taskCategory.value = '';
      elements.taskRate.value = String(DEFAULT_RATE);
		      elements.taskStart.value = '';
      elements.taskEnd.value = '';
      elements.taskHours.selectedIndex = 0;
	      elements.taskQuantity.selectedIndex = 0;
	      elements.taskScreenshots.value = '';
      state.formFiles = [];
      state.lastAutoTaskEnd = '';
	      state.editingIndex = null;
      elements.saveTaskButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg><span>Save</span>';
      updateButtons();
    };

    const fillTaskForm = (task, index) => {
      elements.taskName.value = task.name;
      elements.taskDescription.value = task.description;
		      elements.taskCategory.value = task.category;
      const normalizedRate = Number(task.rate || DEFAULT_RATE);
      elements.taskRate.value = String(Number.isFinite(normalizedRate) ? normalizedRate : DEFAULT_RATE);
		      elements.taskStart.value = task.start;
      elements.taskEnd.value = task.end;
	      elements.taskHours.value = task.hours;
	      elements.taskQuantity.value = task.quantity || '';
      state.lastAutoTaskEnd = '';
      state.formFiles = Array.isArray(task.files) ? [...task.files] : [];
      elements.taskScreenshots.value = '';
	      state.editingIndex = index;
      elements.saveTaskButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6"/><path d="M9 11l3-3 3 3"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg><span>Update</span>';
      updateButtons();
    };

		    const saveTask = async () => {
		      if (!isTaskValid()) {
        showToast('Task editor is incomplete');
        updateButtons();
        return;
      }
		      const task = {
		        name: elements.taskName.value,
		        description: elements.taskDescription.value,
		        category: elements.taskCategory.value,
          rate: getCurrentRate(),
		        start: elements.taskStart.value,
		        end: elements.taskEnd.value,
		        hours: elements.taskHours.value,
		        quantity: elements.taskQuantity.value,
		        screenshots: [],
          files: [...(state.formFiles || [])],
          fileLinks: [],
		      };
      const fileLinkResult = await buildTaskFileLinks(state.formFiles || []);
      task.fileLinks = fileLinkResult.links;
      task.screenshots = fileLinkResult.links.map((item) => item.name || 'file');
      if (state.editingIndex !== null) {
        state.tasks[state.editingIndex] = task;
        showToast(
          fileLinkResult.hostedCount
            ? `Task updated (${fileLinkResult.hostedCount} hosted${fileLinkResult.localFallbackCount ? `, ${fileLinkResult.localFallbackCount} local fallback` : ''})`
            : 'Task updated',
        );
      } else {
        state.tasks.push(task);
        showToast(
          fileLinkResult.hostedCount
            ? `Task added (${fileLinkResult.hostedCount} hosted${fileLinkResult.localFallbackCount ? `, ${fileLinkResult.localFallbackCount} local fallback` : ''})`
            : 'Task added',
        );
      }
      persistTaskNameHistory();
      persistTaskDescriptionHistory();
      persistTaskCategoryHistory();
      resetTaskForm();
      renderInvoice();
    };

    const deleteTask = (index) => {
      state.tasks.splice(index, 1);
      renderInvoice();
      showToast('Task removed');
    };

    const deleteCategory = (categoryName) => {
      const normalizedCategory = String(categoryName || '').trim();
      if (!normalizedCategory) return;
      const originalCount = state.tasks.length;
      if (!originalCount) return;
      const editingTask = state.editingIndex !== null ? state.tasks[state.editingIndex] : null;
      state.tasks = state.tasks.filter((task) => task.category !== normalizedCategory);
      if (state.tasks.length === originalCount) return;
      if (editingTask && editingTask.category === normalizedCategory) {
        resetTaskForm();
      } else if (state.editingIndex !== null && state.editingIndex >= state.tasks.length) {
        state.editingIndex = null;
      }
      renderInvoice();
      showToast(`${normalizedCategory} removed`);
    };

    const editTask = (index) => {
      fillTaskForm(state.tasks[index], index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const makePdfBlobFromText = (text) => {
      if (window.jspdf?.jsPDF) {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({ unit: 'pt', format: 'a4' });
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const margin = 40;
          let y = margin;
          if (INVOICE_LOGO_DATA_URL) {
            doc.addImage(INVOICE_LOGO_DATA_URL, 'PNG', margin, y - 6, 170, 42);
            y += 52;
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          const originalLines = String(text || '').split('\n');
          const lineHeight = 14;
          originalLines.forEach((line) => {
            const promoMatch = String(line).match(/^Download Invoice Studio:\s*link here$/i);
            if (promoMatch) {
              const promoUrl = String(INVOICE_APP_PROMO_URL || '').trim();
              if (!/^https?:\/\//i.test(promoUrl)) return;
              if (y > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text('Download Invoice Studio:', margin, y);
              y += lineHeight;
              if (y > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.setTextColor(20, 70, 160);
              doc.textWithLink('link here', margin, y, { url: promoUrl });
              doc.setTextColor(0, 0, 0);
              y += lineHeight;
              return;
            }
            const wrapped = doc.splitTextToSize(String(line), pageWidth - margin * 2);
            wrapped.forEach((wrappedLine) => {
              if (y > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(String(wrappedLine), margin, y);
              y += lineHeight;
            });
          });
          return doc.output('blob');
        } catch (error) {
          // Fall through to lightweight PDF builder below.
        }
      }
      const escapePdfText = (value) =>
        String(value)
          .replace(/\\/g, '\\\\')
          .replace(/\(/g, '\\(')
          .replace(/\)/g, '\\)');

      const wrapLine = (line, maxChars = 95) => {
        if (line.length <= maxChars) return [line];
        const words = line.split(' ');
        const out = [];
        let current = '';
        words.forEach((word) => {
          const trial = current ? `${current} ${word}` : word;
          if (trial.length > maxChars && current) {
            out.push(current);
            current = word;
          } else {
            current = trial;
          }
        });
        if (current) out.push(current);
        return out.length ? out : [''];
      };

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 40;
      const lineHeight = 14;
      const allLines = text
        .split('\n')
        .flatMap((line) => wrapLine(line));

      const pages = [];
      let pageLines = [];
      let y = pageHeight - margin;
      allLines.forEach((line) => {
        if (y < margin) {
          pages.push(pageLines);
          pageLines = [];
          y = pageHeight - margin;
        }
        pageLines.push({ x: margin, y, line });
        y -= lineHeight;
      });
      if (pageLines.length) pages.push(pageLines);

      const fontObjNum = 3 + pages.length * 2;
      const objects = [];

      objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
      const pageRefs = [];
      pages.forEach((_, i) => {
        const pageObj = 3 + i * 2;
        pageRefs.push(`${pageObj} 0 R`);
      });
      objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pages.length} >>`;

      pages.forEach((entries, i) => {
        const pageObj = 3 + i * 2;
        const contentObj = 4 + i * 2;
        objects[pageObj] =
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] ` +
          `/Resources << /Font << /F1 ${fontObjNum} 0 R >> >> /Contents ${contentObj} 0 R >>`;

        const streamBody =
          'BT\n' +
          '/F1 11 Tf\n' +
          entries
            .map(({ x, y, line }) => `1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(line)}) Tj`)
            .join('\n') +
          '\nET';
        objects[contentObj] =
          `<< /Length ${streamBody.length} >>\nstream\n${streamBody}\nendstream`;
      });

      objects[fontObjNum] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

      let pdf = '%PDF-1.4\n';
      const offsets = [0];
      for (let i = 1; i < objects.length; i += 1) {
        offsets[i] = pdf.length;
        pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
      }
      const xrefPos = pdf.length;
      pdf += `xref\n0 ${objects.length}\n`;
      pdf += '0000000000 65535 f \n';
      for (let i = 1; i < objects.length; i += 1) {
        pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
      }
      pdf +=
        `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\n` +
        `startxref\n${xrefPos}\n%%EOF`;

      return new Blob([pdf], { type: 'application/pdf' });
    };

    const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Failed to encode PDF attachment'));
      reader.readAsDataURL(blob);
    });

    const arrayBufferToBase64 = (buffer) => {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      return btoa(binary);
    };

    const toFolderSafe = (value) => String(value || '')
      .trim()
      .replace(/[^\w.-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);

    const getFolderDateStamp = () => {
      const raw = elements.invoiceDate.value || new Date().toISOString().slice(0, 10);
      return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);
    };

    const requestGoogleToken = (clientId, scope) => new Promise((resolve, reject) => {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        reject(new Error('Google Identity script not loaded'));
        return;
      }
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope,
        callback: (response) => {
          if (response && response.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error(response?.error || 'Failed to get Google Drive token'));
          }
        },
      });
      tokenClient.requestAccessToken({ prompt: 'consent' });
    });

    const createDriveFolder = async (token, name) => {
      const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mimeType: 'application/vnd.google-apps.folder',
        }),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Create folder failed: ${details}`);
      }
      return response.json();
    };

    const makeDriveItemPublic = async (token, fileId) => {
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'reader',
          type: 'anyone',
        }),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Set sharing failed: ${details}`);
      }
    };

    const uploadFileToDriveFolder = async (token, file, folderId) => {
      const boundary = `invoiceStudioBoundary${Date.now()}${Math.random().toString(16).slice(2)}`;
      const metadata = {
        name: file.name || 'attachment',
        mimeType: file.type || 'application/octet-stream',
        parents: [folderId],
      };
      const base64Content = arrayBufferToBase64(await file.arrayBuffer());
      const body =
        `--${boundary}\r\n` +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        `${JSON.stringify(metadata)}\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: ${metadata.mimeType}\r\n` +
        'Content-Transfer-Encoding: base64\r\n\r\n' +
        `${base64Content}\r\n` +
        `--${boundary}--`;

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body,
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Upload file failed: ${details}`);
      }
      return response.json();
    };

    const toFileSafe = (value) => String(value || '')
      .trim()
      .replace(/[^\w.-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 90);

    const buildInvoiceWebCopyHtml = () => {
      const sender = escapeHtml(elements.senderName.value.trim() || 'Invoice Studio');
      const client = escapeHtml(getRecipientDisplayName() || '-');
      const clientEmail = escapeHtml(getRecipientEmailText() || '-');
      const clientName = escapeHtml(elements.clientName.value.trim() || '-');
      const invoiceId = escapeHtml(elements.invoiceId.value.trim() || '-');
      const invoiceDate = escapeHtml(elements.invoiceDate.value || '-');
      const timestamp = escapeHtml(getTimestampWithZone());
      const paymentLink = getValidPaymentLink();
      const paymentHtml = paymentLink
        ? `<a href="${escapeHtml(paymentLink)}" target="_blank" rel="noreferrer">${escapeHtml(paymentLink)}</a>`
        : 'No payment link';
      const taskRows = state.tasks.length
        ? state.tasks.map((task, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHtml(task.category || '-')}</td>
              <td>${escapeHtml(task.name || '-')}</td>
              <td>${escapeHtml(task.start || '-')} - ${escapeHtml(task.end || '-')}</td>
              <td>${escapeHtml(String(task.hours || 0))}</td>
              <td>${escapeHtml(String(task.quantity || 0))}</td>
              <td>${escapeHtml(formatMoney(Number(task.rate || 0)))}</td>
              <td>${escapeHtml(formatMoney(computeSubtotal(task.hours, task.quantity, task.rate)))}</td>
            </tr>
          `).join('')
        : '<tr><td colspan="8">No tasks added yet.</td></tr>';

      return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Invoice ${invoiceId}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #111827; }
    .wrap { max-width: 920px; margin: 0 auto; border: 1px solid #d1d5db; border-radius: 12px; padding: 18px; }
    .head { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
    .brand { font-size: 24px; font-weight: 700; }
    .statement { font-size: 18px; font-weight: 700; text-align: right; }
    .meta { font-size: 13px; line-height: 1.5; text-align: right; }
    .box { border: 1px solid #d1d5db; border-radius: 10px; padding: 12px; margin-top: 10px; font-size: 13px; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    th, td { border: 1px solid #d1d5db; padding: 7px; text-align: left; vertical-align: top; }
    th { background: #f3f4f6; }
    .total { margin-top: 12px; text-align: right; font-size: 20px; font-weight: 700; }
    .note { margin-top: 14px; border-top: 1px solid #d1d5db; padding-top: 12px; white-space: pre-wrap; font-size: 13px; line-height: 1.6; }
    .tip { margin-top: 14px; border: 1px dashed #9ca3af; border-radius: 10px; padding: 10px; background: #f9fafb; font-size: 12px; }
    .promo { margin-top: 12px; font-size: 11px; color: #6b7280; text-align: center; }
    .promo a { color: #111827; text-decoration: underline; font-weight: 600; }
    @media print { body { margin: 0; } .wrap { border: none; border-radius: 0; } .tip { display: none; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="head">
      <div>
        ${INVOICE_LOGO_DATA_URL ? `<img src="${INVOICE_LOGO_DATA_URL}" alt="Invoice logo" style="display:block;width:220px;max-width:100%;height:auto;margin-bottom:8px;" />` : ''}
        <div class="brand">Statement</div>
        <div>From: ${sender}</div>
      </div>
      <div>
        <div class="statement">STATEMENT</div>
        <div class="meta">
          Invoice: ${invoiceId}<br />
          Date: ${invoiceDate}<br />
          Timestamp: ${timestamp}
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="box"><strong>Bill To</strong><br />Buyer account: ${clientName}<br />Recipients: ${client}<br />Email: ${clientEmail}</div>
      <div class="box"><strong>Payment</strong><br />${paymentHtml}</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th><th>Category</th><th>Task</th><th>Period</th><th>Hours</th><th>Qty</th><th>Rate</th><th>Total</th>
        </tr>
      </thead>
      <tbody>${taskRows}</tbody>
    </table>
    <div class="total">Grand total: ${escapeHtml(elements.grandTotal.textContent || '$0.00')}</div>
    <div class="note">${escapeHtml(finalNote())}</div>
    <div class="promo">Need your own invoicing system? <a href="${escapeHtml(getPromoLink())}" target="_blank" rel="noreferrer">${escapeHtml(INVOICE_APP_PROMO_LABEL)}</a></div>
    <div class="tip">
      PDF instruction: open this page in your browser, then press Ctrl+P (Windows) or Cmd+P (Mac), and choose "Save as PDF".
    </div>
  </div>
</body>
</html>`;
    };

    const getInvoiceWebCopyFileName = () => {
      const invoiceIdSafe = toFileSafe(elements.invoiceId.value.trim() || `DRAFT-${Date.now()}`) || 'invoice-copy';
      return `${invoiceIdSafe}-invoice-copy.html`;
    };

    const uploadInvoicePackageToDrive = async ({ files = [], includeInvoiceWebCopy = false } = {}) => {
      const clientId = elements.googleDriveClientId.value.trim();
      if (!clientId) throw new Error('Google OAuth Client ID missing');
      const safeFiles = Array.isArray(files) ? files : [];
      if (!safeFiles.length && !includeInvoiceWebCopy) return { folderUrl: '', invoiceWebCopyUrl: '' };

      const token = await requestGoogleToken(clientId, 'https://www.googleapis.com/auth/drive.file');
      const dateStamp = getFolderDateStamp();
      const invoiceId = toFolderSafe(elements.invoiceId.value.trim() || `DRAFT-${Date.now()}`);
      const client = toFolderSafe(getRecipientDisplayName()) || 'Client';
      const folderName = `Invoice-${dateStamp}-${invoiceId}-${client}`;
      const folder = await createDriveFolder(token, folderName);
      await makeDriveItemPublic(token, folder.id);

      for (const file of safeFiles) {
        const uploaded = await uploadFileToDriveFolder(token, file, folder.id);
        await makeDriveItemPublic(token, uploaded.id);
      }

      let invoiceWebCopyUrl = '';
      if (includeInvoiceWebCopy) {
        const invoiceHtml = buildInvoiceWebCopyHtml();
        const invoiceHtmlFile = new File(
          [invoiceHtml],
          getInvoiceWebCopyFileName(),
          { type: 'text/html;charset=utf-8' },
        );
        const uploadedInvoiceHtml = await uploadFileToDriveFolder(token, invoiceHtmlFile, folder.id);
        await makeDriveItemPublic(token, uploadedInvoiceHtml.id);
        invoiceWebCopyUrl = uploadedInvoiceHtml.webViewLink || `https://drive.google.com/file/d/${uploadedInvoiceHtml.id}/view`;
      }

      return {
        folderUrl: folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`,
        invoiceWebCopyUrl,
      };
    };

    const buildTransactionDescription = () => {
      const taskSummary = state.tasks
        .map((task) => `${task.name}: ${task.hours}h x ${task.quantity}`)
        .join(' | ');
      return taskSummary || 'No tasks';
    };

    const ensureSheetHeader = async (token, spreadsheetId) => {
      const tabNameEscaped = TRANSACTION_TAB_NAME.replace(/'/g, "''");
      const headerRange = `'${tabNameEscaped}'!1:1`;
      const headerCheck = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(headerRange)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!headerCheck.ok) {
        const details = await headerCheck.text();
        throw new Error(`Read sheet failed: ${details}`);
      }
      const payload = await headerCheck.json();
      const existing = Array.isArray(payload.values) && payload.values.length ? payload.values[0] : [];
      const normalized = existing.map((item) => String(item).toLowerCase());
      const hasHeader = normalized.includes('name') && normalized.includes('date') && normalized.includes('amount') && normalized.includes('description');
      if (hasHeader) return;

      const writeRange = `'${tabNameEscaped}'!A1:D1`;
      const writeHeader = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(writeRange)}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [['Name', 'Date', 'Amount', 'Description']],
        }),
      });
      if (!writeHeader.ok) {
        const details = await writeHeader.text();
        throw new Error(`Write header failed: ${details}`);
      }
    };

    const ensureTransactionTab = async (token, spreadsheetId) => {
      const detailsResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}?fields=sheets(properties(title))`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!detailsResponse.ok) {
        const details = await detailsResponse.text();
        throw new Error(`Read sheet tabs failed: ${details}`);
      }
      const details = await detailsResponse.json();
      const tabs = Array.isArray(details.sheets) ? details.sheets.map((s) => s?.properties?.title).filter(Boolean) : [];
      if (tabs.includes(TRANSACTION_TAB_NAME)) return;

      const addTabResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: TRANSACTION_TAB_NAME } } }],
        }),
      });
      if (!addTabResponse.ok) {
        const addDetails = await addTabResponse.text();
        throw new Error(`Create "${TRANSACTION_TAB_NAME}" tab failed: ${addDetails}`);
      }
    };

    const createTransactionSheet = async (token) => {
      const suggestedTitle = TRANSACTION_TAB_NAME;
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: { title: suggestedTitle },
          sheets: [{ properties: { title: TRANSACTION_TAB_NAME } }],
        }),
      });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Create sheet failed: ${details}`);
      }
      const created = await response.json();
      return {
        id: created.spreadsheetId,
        url: created.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${created.spreadsheetId}/edit`,
      };
    };

    const appendTransactionToSheet = async () => {
      let spreadsheetId = getStoredSheetId();
      const clientId = elements.googleDriveClientId.value.trim();
      if (!clientId) throw new Error('Google OAuth Client ID missing');
      const token = await requestGoogleToken(
        clientId,
        'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
      );
      if (!spreadsheetId) {
        const created = await createTransactionSheet(token);
        spreadsheetId = created.id;
        setStoredSheetId(spreadsheetId);
        state.transactionSheetUrl = created.url;
      }
      await ensureTransactionTab(token, spreadsheetId);
      await ensureSheetHeader(token, spreadsheetId);

      const name = getRecipientDisplayName() || 'Unknown';
      const date = elements.invoiceDate.value || new Date().toISOString().slice(0, 10);
      const amount = elements.grandTotal.textContent || '$0.00';
      const description = buildTransactionDescription();

      const tabNameEscaped = TRANSACTION_TAB_NAME.replace(/'/g, "''");
      const appendRange = `'${tabNameEscaped}'!A:D`;
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(appendRange)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[name, date, amount, description]],
          }),
        },
      );
      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Append row failed: ${details}`);
      }
      const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
      state.transactionSheetUrl = sheetUrl;
      return { logged: true, url: sheetUrl };
    };

    const runTestUpload = async () => {
      state.lastEmailError = '';
      showToast('Upload feature is disabled in buyer app');
      renderInvoicePreview();
    };

    const createInvoicePdfBlob = () => {
      const preview = elements.invoicePreviewText.textContent.trim() || composeInvoiceBody();
      return makePdfBlobFromText(preview);
    };

    const getInvoicePdfFileName = () => {
      const safeId = (elements.invoiceId.value || 'invoice').replace(/[^a-zA-Z0-9-_]/g, '_');
      return `${safeId}.pdf`;
    };

    const downloadInvoicePdf = (blob) => {
      const filename = getInvoicePdfFileName();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return filename;
    };

    const exportPreviewPdf = async () => {
      const preview = elements.invoicePreviewText.textContent.trim();
      if (!preview) {
        showToast('No preview content');
        return;
      }
      const blob = createInvoicePdfBlob();
      const filename = downloadInvoicePdf(blob);
      const dataUrl = await blobToDataUrl(blob);
      saveDownloadHistoryEntry({
        source: 'export-preview',
        pdfDataUrl: dataUrl,
        pdfName: filename,
      });
      showToast('PDF downloaded');
    };

    const shareInvoice = async () => {
      const invoiceText = composeInvoiceBody();
      const subject = `Invoice ${elements.invoiceId.value.trim() || 'Draft'} - ${getRecipientDisplayName() || 'Client'}`;
      try {
        if (navigator.share) {
          await navigator.share({
            title: subject,
            text: invoiceText,
          });
          showToast('Invoice summary shared');
          return;
        }
      } catch (error) {
        // fallback to clipboard below
      }
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(`${subject}\n\n${invoiceText}`);
          showToast('Invoice summary copied');
          return;
        }
      } catch (error) {
        // continue to final fallback
      }
      showToast('Share is not available on this device');
    };

	    const composeInvoiceBody = () => {
	      const groups = groupTasks();
	      const lines = [...getInvoiceHeaderLines(), ''];
	      lines.push(`Invoice: ${elements.invoiceId.value.trim()}`);
      lines.push(`Date: ${elements.invoiceDate.value}`);
      lines.push(`Timestamp: ${getTimestampWithZone()}`);
      lines.push(`Sender: ${elements.senderName.value.trim()}`);
      lines.push(`Buyer account: ${elements.clientName.value.trim()}`);
      lines.push(`Recipient name(s): ${getRecipientDisplayName()}`);
      lines.push(`Recipient email(s): ${getRecipientEmailText()}`);
	      lines.push('');
	      Object.keys(groups).forEach((category) => {
	        lines.push(`${category} (${groups[category].length} tasks)`);
	        groups[category].forEach((task) => {
          lines.push(`- ${task.name} | ${task.description} | ${task.start} → ${task.end} | ${task.hours}h × ${task.quantity} @ ${formatMoney(task.rate)}/hr | ${formatMoney(computeSubtotal(task.hours, task.quantity, task.rate))}`);
          const links = Array.isArray(task.fileLinks) ? task.fileLinks : [];
          if (links.length) {
            lines.push(`  Files: ${links.map((fileLink) => fileLink.name).join(', ')}`);
          } else if (task.screenshots.length) {
		          lines.push(`  Files: ${task.screenshots.join(', ')}`);
          }
		        });
        lines.push(`Category subtotal: ${formatMoney(groups[category].reduce((sum, task) => sum + computeSubtotal(task.hours, task.quantity, task.rate), 0))}`);
	        lines.push('');
	      });
      lines.push(`Grand total: ${elements.grandTotal.textContent}`);
      lines.push('');
	      lines.push(`Payment link: ${getValidPaymentLink() || 'Not provided'}`);
	      lines.push('');
      lines.push(finalNote());
	      return lines.join('\n');
	    };

    const sendInvoice = async () => {
      if (!state.licensed) {
        showToast('License required');
        return;
      }
      if (state.tamperLocked) {
        showToast('Security lock active. Contact support.');
        return;
      }
      if (isTrialExhausted()) {
        showTrialLockedPopup();
        updateButtons();
        return;
      }
      if (!isInvoiceReady()) {
        const issues = getInvoiceReadinessIssues();
        showToast(issues[0] || 'Complete invoice details');
        return;
      }
      const emailJsPublicKey = elements.emailjsPublicKey.value.trim();
      const emailJsServiceId = elements.emailjsServiceId.value.trim();
      const emailJsTemplateId = elements.emailjsTemplateId.value.trim();
      if (!window.emailjs || !emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
        showToast('Set up EmailJS first (Public Key, Service ID, Template ID)');
        focusEmailSetup(true);
        return;
      }
      state.lastEmailError = '';
      persistClientHistory();
      persistEmailJsSettings();
      const to = getRecipientEmailText();
      const cc = getCcEmailText();
      const primaryRecipient = getPrimaryRecipientEmail();
      const subject = `Invoice ${elements.invoiceId.value.trim()} - ${getRecipientDisplayName()}`;
      let body = composeEmailMessage();
      const bodyHtml = composeEmailHtml();
      const attached = listAttachmentNames();
      if (attached.length) {
        body += `\n\nAttached files to include manually in Gmail:\n- ${attached.join('\n- ')}`;
      }
      const taskFiles = state.tasks.flatMap((task) => (Array.isArray(task.files) ? task.files : []));
      const hasGoogleAdvanced = false;
      state.driveFolderUrl = '';
      state.invoiceWebCopyUrl = '';
      if (taskFiles.length > 0) {
        body += '\n\nAttached files upload is currently disabled.';
      }
      const invoicePdfBlob = createInvoicePdfBlob();
      const invoicePdfName = getInvoicePdfFileName();
      const invoiceHtmlBlob = new Blob([buildInvoiceWebCopyHtml()], { type: 'text/html;charset=utf-8' });
      const invoiceHtmlName = getInvoiceWebCopyFileName();
      const invoicePdfDataUrl = await blobToDataUrl(invoicePdfBlob);
      const invoiceHtmlDataUrl = await blobToDataUrl(invoiceHtmlBlob);
      saveDownloadHistoryEntry({
        source: 'send-invoice',
        pdfDataUrl: invoicePdfDataUrl,
        pdfName: invoicePdfName,
        htmlDataUrl: invoiceHtmlDataUrl,
        htmlName: invoiceHtmlName,
      });
      const canUseEmailJs = Boolean(window.emailjs && emailJsPublicKey && emailJsServiceId && emailJsTemplateId);
      const missing = [];
      if (!window.emailjs) missing.push('EmailJS SDK not loaded');
      if (!emailJsPublicKey) missing.push('Public Key missing');
      if (!emailJsServiceId) missing.push('Service ID missing');
      if (!emailJsTemplateId) missing.push('Template ID missing');
      if (canUseEmailJs) {
        try {
          window.emailjs.init({ publicKey: emailJsPublicKey });
          const baseParams = {
            to_name: getRecipientDisplayName(),
            from_name: elements.senderName.value.trim(),
            reply_to: primaryRecipient || to,
            email: to,
            name: getRecipientDisplayName(),
            time: getTimestampWithZone(),
            to_email: to,
            cc_emails: cc,
            subject,
            invoice_id: elements.invoiceId.value.trim(),
            sender_name: elements.senderName.value.trim(),
            client_name: elements.clientName.value.trim() || getRecipientDisplayName(),
            buyer_account: elements.clientName.value.trim() || getRecipientDisplayName(),
            client_email: primaryRecipient || to,
            grand_total: elements.grandTotal.textContent,
            payment_link: getValidPaymentLink() || '',
            message: body,
            message_html: bodyHtml,
            promo_url: getPromoEmailText(),
            promo_label: INVOICE_APP_PROMO_LABEL,
            promo_link_html: getPromoEmailText() ? `<a href="${getPromoEmailText()}" target="_blank" rel="noreferrer">${INVOICE_APP_PROMO_LABEL}</a>` : '',
            payment_link_html: getValidPaymentLink() ? `<a href="${getValidPaymentLink()}" target="_blank" rel="noreferrer">${getValidPaymentLink()}</a>` : 'Not provided',
          };
          const sendVariants = [
            {
              ...baseParams,
              invoice_pdf: invoicePdfDataUrl,
              invoice_pdf_name: invoicePdfName,
              invoice_html: invoiceHtmlDataUrl,
              invoice_html_name: invoiceHtmlName,
            },
            {
              ...baseParams,
              invoice_pdf: invoicePdfDataUrl,
              invoice_pdf_name: invoicePdfName,
            },
            baseParams,
          ];
          let sendOk = false;
          let lastError = null;
          for (let i = 0; i < sendVariants.length; i += 1) {
            try {
              await window.emailjs.send(emailJsServiceId, emailJsTemplateId, sendVariants[i]);
              sendOk = true;
              break;
            } catch (variantError) {
              lastError = variantError;
            }
          }
          if (!sendOk) {
            throw lastError || new Error('Unknown EmailJS send failure');
          }
          showToast('Invoice sent via EmailJS (PDF + HTML copy)');
          setTrialSendCount(getTrialSendCount() + 1);
          renderTrialStatus();
          state.gmailDraftUrl = '';
          state.lastEmailError = '';
          elements.invoiceId.value = generateNextInvoiceId();
          renderInvoice();
          return;
        } catch (error) {
          const errorText =
            error?.text ||
            error?.message ||
            (typeof error === 'string' ? error : 'Unknown EmailJS error');
          const errorStatus = error?.status ? ` (${error.status})` : '';
          state.lastEmailError = `EmailJS failed${errorStatus}: ${errorText}`;
          showToast(state.lastEmailError);
          renderInvoicePreview();
          return;
        }
      } else if (missing.length) {
        state.lastEmailError = `EmailJS not used: ${missing.join(', ')}`;
        showToast(state.lastEmailError);
        renderInvoicePreview();
        return;
      }
      const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to,
        cc,
        su: subject,
        body,
      });
      const url = `https://mail.google.com/mail/?${params.toString()}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
          showToast('Gmail draft link copied. Paste in browser to open.');
        } else {
          showToast('Draft ready. Copy link from preview area.');
        }
      } catch (error) {
        showToast('Draft ready. Copy link from preview area.');
      }
      state.gmailDraftUrl = url;
      elements.invoiceId.value = generateNextInvoiceId();
      renderInvoice();
    };

    const sendTestEmail = async () => {
      if (!state.licensed) {
        showToast('License required');
        return;
      }
      state.lastEmailError = '';
      persistEmailJsSettings();
      const emailJsPublicKey = elements.emailjsPublicKey.value.trim();
      const emailJsServiceId = elements.emailjsServiceId.value.trim();
      const emailJsTemplateId = elements.emailjsTemplateId.value.trim();
      if (!window.emailjs || !emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
        showToast('Set Public Key, Service ID, and Template ID first');
        focusEmailSetup(true);
        return;
      }

      const to = getPrimaryRecipientEmail() || 'kone.uy@gmail.com';
      const who = getRecipientDisplayName() || 'Test Client';
      const subject = `TEST - Invoice ${elements.invoiceId.value.trim() || 'DRAFT'}`;
      const testFiles = [...(state.testUploadFiles || [])];
      const hasGoogleAdvanced = false;
      state.driveFolderUrl = '';
      state.invoiceWebCopyUrl = '';
      let body = composeEmailMessage({ isTest: true, recipient: who });
      const bodyHtml = composeEmailHtml({ isTest: true, recipient: who });
      body += `\n\nSent: ${getTimestampWithZone()}`;
      if (testFiles.length || hasGoogleAdvanced) {
        body += '\n\nUpload feature is currently disabled for this build.';
      }
      const invoicePdfBlob = createInvoicePdfBlob();
      const invoicePdfName = getInvoicePdfFileName();
      const invoiceHtmlBlob = new Blob([buildInvoiceWebCopyHtml()], { type: 'text/html;charset=utf-8' });
      const invoiceHtmlName = getInvoiceWebCopyFileName();
      const invoicePdfDataUrl = await blobToDataUrl(invoicePdfBlob);
      const invoiceHtmlDataUrl = await blobToDataUrl(invoiceHtmlBlob);
      saveDownloadHistoryEntry({
        source: 'send-test',
        pdfDataUrl: invoicePdfDataUrl,
        pdfName: invoicePdfName,
        htmlDataUrl: invoiceHtmlDataUrl,
        htmlName: invoiceHtmlName,
      });

      try {
        window.emailjs.init({ publicKey: emailJsPublicKey });
        const baseParams = {
          to_name: who,
          from_name: elements.senderName.value.trim() || 'Invoice Studio',
          reply_to: to,
          email: to,
          name: who,
          time: getTimestampWithZone(),
          to_email: to,
          cc_emails: getCcEmailText(),
          subject,
          invoice_id: elements.invoiceId.value.trim() || 'DRAFT',
          sender_name: elements.senderName.value.trim() || 'Invoice Studio',
          client_name: elements.clientName.value.trim() || who,
          buyer_account: elements.clientName.value.trim() || who,
          client_email: to,
          grand_total: elements.grandTotal.textContent || '$0.00',
          payment_link: getValidPaymentLink() || '',
          message: body,
          message_html: bodyHtml,
          promo_url: getPromoEmailText(),
          promo_label: INVOICE_APP_PROMO_LABEL,
          promo_link_html: getPromoEmailText() ? `<a href="${getPromoEmailText()}" target="_blank" rel="noreferrer">${INVOICE_APP_PROMO_LABEL}</a>` : '',
          payment_link_html: getValidPaymentLink() ? `<a href="${getValidPaymentLink()}" target="_blank" rel="noreferrer">${getValidPaymentLink()}</a>` : 'Not provided',
        };
        const sendVariants = [
          {
            ...baseParams,
            invoice_pdf: invoicePdfDataUrl,
            invoice_pdf_name: invoicePdfName,
            invoice_html: invoiceHtmlDataUrl,
            invoice_html_name: invoiceHtmlName,
          },
          {
            ...baseParams,
            invoice_pdf: invoicePdfDataUrl,
            invoice_pdf_name: invoicePdfName,
          },
          baseParams,
        ];
        let sendOk = false;
        let lastError = null;
        for (let i = 0; i < sendVariants.length; i += 1) {
          try {
            await window.emailjs.send(emailJsServiceId, emailJsTemplateId, sendVariants[i]);
            sendOk = true;
            break;
          } catch (variantError) {
            lastError = variantError;
          }
        }
        if (!sendOk) {
          throw lastError || new Error('Unknown EmailJS send failure');
        }
        showToast(`Test email sent to ${to}`);
      } catch (error) {
        const errorText =
          error?.text ||
          error?.message ||
          (typeof error === 'string' ? error : 'Unknown EmailJS error');
        const errorStatus = error?.status ? ` (${error.status})` : '';
        state.lastEmailError = `EmailJS test failed${errorStatus}: ${errorText}`;
        showToast(state.lastEmailError);
        renderInvoicePreview();
      }
    };

	    const bindEvents = () => {
      const inputs = [
		        elements.invoiceId,
          elements.invoiceDate,
          elements.senderName,
        elements.clientName,
		        elements.clientEmail,
        elements.ccEmail,
        elements.recipientName,
		        elements.noteText,
        elements.emailjsPublicKey,
        elements.emailjsServiceId,
        elements.emailjsTemplateId,
        elements.googleDriveClientId,
        elements.taskName,
        elements.taskDescription,
			        elements.taskCategory,
	          elements.taskRate,
			        elements.taskStart,
	        elements.taskEnd,
	        elements.taskHours,
	        elements.taskQuantity,
	        elements.wiseLink,
	      ];
      const onAnyInput = () => {
        autoPopulateTaskQuantityFromHours();
        updateButtons();
        renderInvoicePreview();
        persistFormDraft();
      };
      inputs.forEach((input) => {
        input.addEventListener('input', onAnyInput);
        input.addEventListener('change', onAnyInput);
      });
      elements.taskStart.addEventListener('change', () => {
        autoPopulateTaskEndFromStart();
        autoPopulateTaskQuantityFromHours();
        updateButtons();
        renderInvoicePreview();
      });
      elements.taskHours.addEventListener('change', () => {
        autoPopulateTaskQuantityFromHours();
        updateButtons();
        renderInvoicePreview();
      });
      elements.taskEnd.addEventListener('input', () => {
        const currentEnd = String(elements.taskEnd.value || '').trim();
        if (currentEnd !== state.lastAutoTaskEnd) {
          state.lastAutoTaskEnd = '';
        }
      });
      elements.taskScreenshots.addEventListener('change', () => {
        appendFiles(elements.taskScreenshots.files || []);
        elements.taskScreenshots.value = '';
        updateButtons();
      });
      elements.testUploadInput.addEventListener('change', () => {
        appendTestUploadFiles(elements.testUploadInput.files || []);
        elements.testUploadInput.value = '';
        updateButtons();
        runTestUpload();
      });
      elements.taskRate.addEventListener('change', updateButtons);
      elements.uploadTrigger.addEventListener('click', () => {
        elements.taskScreenshots.click();
      });
      elements.testUploadTrigger.addEventListener('click', () => {
        elements.testUploadInput.click();
      });
      elements.uploadTrigger.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      elements.testUploadTrigger.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      elements.uploadTrigger.addEventListener('drop', (event) => {
        event.preventDefault();
        const dropped = Array.from(event.dataTransfer?.files || []);
        if (!dropped.length) return;
        appendFiles(dropped);
        elements.taskScreenshots.value = '';
        updateButtons();
      });
      elements.testUploadTrigger.addEventListener('drop', (event) => {
        event.preventDefault();
        const dropped = Array.from(event.dataTransfer?.files || []);
        if (!dropped.length) return;
        appendTestUploadFiles(dropped);
        elements.testUploadInput.value = '';
        updateButtons();
        runTestUpload();
      });
      elements.fileIndicator.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-file-index]');
        if (!button) return;
        const index = Number(button.dataset.fileIndex);
        if (Number.isNaN(index)) return;
        state.formFiles.splice(index, 1);
        elements.taskScreenshots.value = '';
        updateButtons();
      });
      elements.testUploadIndicator.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-test-file-index]');
        if (!button) return;
        const index = Number(button.dataset.testFileIndex);
        if (Number.isNaN(index)) return;
        state.testUploadFiles.splice(index, 1);
        elements.testUploadInput.value = '';
        updateButtons();
      });
      elements.categorySubtotals.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-delete-category]');
        if (!button) return;
        const categoryName = String(button.dataset.deleteCategory || '');
        deleteCategory(categoryName);
      });
      elements.clientName.addEventListener('change', persistClientHistory);
      elements.clientEmail.addEventListener('change', persistClientHistory);
      elements.ccEmail.addEventListener('change', persistClientHistory);
      elements.clientName.addEventListener('blur', persistClientHistory);
      elements.clientEmail.addEventListener('blur', persistClientHistory);
      elements.ccEmail.addEventListener('blur', persistClientHistory);
      elements.emailjsPublicKey.addEventListener('blur', persistEmailJsSettings);
      elements.emailjsServiceId.addEventListener('blur', persistEmailJsSettings);
      elements.emailjsTemplateId.addEventListener('blur', persistEmailJsSettings);
      elements.googleDriveClientId.addEventListener('blur', persistEmailJsSettings);
      elements.unlockAppButton.addEventListener('click', unlockApp);
      elements.licenseKeyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') unlockApp();
      });
      elements.taskName.addEventListener('blur', persistTaskNameHistory);
      elements.taskDescription.addEventListener('blur', persistTaskDescriptionHistory);
      elements.taskCategory.addEventListener('blur', persistTaskCategoryHistory);
      elements.clearCustomHistoryButton.addEventListener('click', clearCustomHistory);
      elements.transactionHistoryButton.addEventListener('click', toggleTransactionHistoryPanel);
      elements.closeTransactionHistoryButton.addEventListener('click', closeTransactionHistoryPanel);
      if (elements.transactionHistorySearch) {
        elements.transactionHistorySearch.addEventListener('input', () => {
          state.historyShowAll = false;
          renderDownloadHistory();
        });
      }
      elements.transactionHistoryList.addEventListener('click', (event) => {
        const toggleMoreButton = event.target.closest('button[data-history-action="toggle-more"]');
        if (toggleMoreButton) {
          state.historyShowAll = !state.historyShowAll;
          renderDownloadHistory();
          return;
        }
        const toggleAllCheckbox = event.target.closest('input[data-history-action="toggle-all"]');
        if (toggleAllCheckbox) {
          const checked = Boolean(toggleAllCheckbox.checked);
          const history = readDownloadHistory();
          const visibleItems = state.historyShowAll ? history : history.slice(0, 3);
          const visibleIds = visibleItems.map((item) => String(item.id));
          if (checked) {
            const next = new Set(state.historySelectedIds || []);
            visibleIds.forEach((id) => next.add(id));
            state.historySelectedIds = Array.from(next);
          } else {
            const remove = new Set(visibleIds);
            state.historySelectedIds = (state.historySelectedIds || []).filter((id) => !remove.has(id));
          }
          renderDownloadHistory();
          return;
        }
        const eraseSelectedButton = event.target.closest('button[data-history-action="erase-selected"]');
        if (eraseSelectedButton) {
          const selected = new Set(state.historySelectedIds || []);
          if (!selected.size) return;
          const confirmed = window.confirm(`Delete ${selected.size} selected history item(s)?`);
          if (!confirmed) return;
          const history = readDownloadHistory();
          const filtered = history.filter((item) => !selected.has(String(item.id)));
          writeDownloadHistory(filtered);
          state.historySelectedIds = [];
          renderDownloadHistory();
          showToast('Selected history erased');
          return;
        }
        const button = event.target.closest('button[data-history-action][data-history-id]');
        if (!button) return;
        const historyId = String(button.dataset.historyId || '');
        const action = String(button.dataset.historyAction || '');
        if (!historyId || !action) return;
        const history = readDownloadHistory();
        const target = history.find((item) => item.id === historyId);
        if (!target) {
          showToast('History item not found');
          return;
        }
        if (action === 'pdf') {
          if (!downloadDataUrlFile(target.pdfDataUrl, target.pdfName)) {
            showToast('PDF copy is not available');
            return;
          }
          showToast('PDF re-downloaded');
          return;
        }
        if (action === 'html') {
          if (openHtmlDataUrlPreview(target.htmlDataUrl)) {
            showToast('HTML preview opened');
            return;
          }
          if (!downloadDataUrlFile(target.htmlDataUrl, target.htmlName)) {
            showToast('HTML copy is not available');
            return;
          }
          showToast('HTML downloaded');
          return;
        }
        if (action === 'erase') {
          const confirmed = window.confirm('Are you sure you want to delete this history record?');
          if (!confirmed) return;
          const filtered = history.filter((item) => item.id !== historyId);
          writeDownloadHistory(filtered);
          state.historySelectedIds = (state.historySelectedIds || []).filter((id) => id !== historyId);
          renderDownloadHistory();
          showToast('History item erased');
        }
      });
      elements.transactionHistoryList.addEventListener('change', (event) => {
        const check = event.target.closest('input[data-history-check]');
        if (!check) return;
        const historyId = String(check.dataset.historyCheck || '');
        if (!historyId) return;
        const next = new Set(state.historySelectedIds || []);
        if (check.checked) next.add(historyId);
        else next.delete(historyId);
        state.historySelectedIds = Array.from(next);
        renderDownloadHistory();
      });
		      elements.saveTaskButton.addEventListener('click', saveTask);
	      elements.resetTaskButton.addEventListener('click', resetTaskForm);
      elements.shareInvoiceButton.addEventListener('click', shareInvoice);
      elements.exportPdfButton.addEventListener('click', exportPreviewPdf);
      elements.sendInvoiceButton.addEventListener('click', sendInvoice);
      elements.sendTestEmailButton.addEventListener('click', sendTestEmail);
      if (elements.adminLoginButton) {
        elements.adminLoginButton.addEventListener('click', toggleAdminLogin);
      }
	    };

    const renderInvoicePreview = () => {
      if (elements.invoicePreviewLogo) {
        if (INVOICE_LOGO_DATA_URL) {
          elements.invoicePreviewLogo.src = INVOICE_LOGO_DATA_URL;
          elements.invoicePreviewLogo.classList.remove('hidden');
        } else {
          elements.invoicePreviewLogo.removeAttribute('src');
          elements.invoicePreviewLogo.classList.add('hidden');
        }
      }
      const lines = [...getInvoiceHeaderLines(), ''];
      lines.push(`INVOICE ${elements.invoiceId.value || '-'}`);
      lines.push(`Date: ${elements.invoiceDate.value || '-'}`);
      lines.push(`Timestamp: ${getTimestampWithZone()}`);
      lines.push(`From: ${elements.senderName.value.trim() || '-'}`);
      lines.push(`Buyer account: ${elements.clientName.value.trim() || '-'}`);
      lines.push(`Recipient name(s): ${getRecipientDisplayName() || '-'}`);
      lines.push(`Recipient email(s): ${getRecipientEmailText() || '-'}`);
      lines.push('');
      if (!state.tasks.length) {
        lines.push('No tasks added yet.');
      } else {
        state.tasks.forEach((task, idx) => {
          lines.push(`${idx + 1}. ${task.name} (${task.category})`);
          lines.push(`   ${task.description}`);
          lines.push(`   ${task.start} to ${task.end}`);
          lines.push(`   ${task.hours}h x ${task.quantity} @ ${formatMoney(task.rate)}/hr = ${formatMoney(computeSubtotal(task.hours, task.quantity, task.rate))}`);
        });
      }
      lines.push('');
      lines.push(`TOTAL: ${elements.grandTotal.textContent}`);
      lines.push('');
      lines.push(finalNote());
      lines.push('');
      elements.invoicePreviewText.textContent = lines.join('\n');

      const fileLinks = state.tasks.flatMap((task) => (task.fileLinks || []).map((link) => ({
        task: task.description || task.name,
        name: link.name,
        url: link.url,
        type: link.type || '',
      }))).filter((item) => isOpenableFileUrl(item?.url));
      const linksMarkup = [];
      if (state.gmailDraftUrl) {
        linksMarkup.push(`<a href="${escapeHtml(state.gmailDraftUrl)}" target="_blank" rel="noreferrer">Open Gmail Draft (manual)</a>`);
      }
      if (state.lastEmailError) {
        linksMarkup.push(`<span style="color:#b91c1c;">${escapeHtml(state.lastEmailError)}</span>`);
      }
      if (state.driveFolderUrl) {
        linksMarkup.push(`<a href="${escapeHtml(state.driveFolderUrl)}" target="_blank" rel="noreferrer">Open Google Drive attachments folder</a>`);
      }
      if (state.invoiceWebCopyUrl) {
        linksMarkup.push(`<a href="${escapeHtml(state.invoiceWebCopyUrl)}" target="_blank" rel="noreferrer">Open invoice web copy (download PDF from browser)</a>`);
      }
      if (state.transactionSheetUrl) {
        linksMarkup.push(`<a href="${escapeHtml(state.transactionSheetUrl)}" target="_blank" rel="noreferrer">Open transaction log sheet (${escapeHtml(TRANSACTION_TAB_NAME)})</a>`);
      }
      linksMarkup.push(`<span style="font-size:11px;color:#6b7280;">Need your own invoicing system? <a href="${escapeHtml(getPromoLink())}" target="_blank" rel="noreferrer">${escapeHtml(INVOICE_APP_PROMO_LABEL)}</a></span>`);
      if (fileLinks.length) {
        const canViewInline = (item) => {
          const ext = String(item.name || '').toLowerCase();
          return item.type === 'application/pdf' ||
            item.type === 'image/png' ||
            item.type === 'image/jpeg' ||
            ext.endsWith('.pdf') ||
            ext.endsWith('.png') ||
            ext.endsWith('.jpg') ||
            ext.endsWith('.jpeg');
        };
        linksMarkup.push(...fileLinks.map((item) => {
          const base = `${escapeHtml(item.task)}: ${escapeHtml(item.name)}`;
          const viewLink = canViewInline(item)
            ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${base} (View)</a>`
            : '';
          const downloadLink = `<a href="${escapeHtml(item.url)}" download="${escapeHtml(item.name)}" rel="noreferrer">${base} (Download)</a>`;
          return [viewLink, downloadLink].filter(Boolean).join('<br>');
        }));
      }
      elements.invoiceFileLinks.innerHTML = linksMarkup.join('<br>');
    };

	    const renderInvoice = () => {
	      renderSummary();
      renderInvoicePreview();
	      updateButtons();
	    };

	    if (!elements.noteText.value.trim()) {
	      elements.noteText.value = DEFAULT_NOTE;
	    }
    if (!elements.ccEmail.value.trim()) {
      elements.ccEmail.value = DEFAULT_CC_EMAILS;
    }
    elements.invoiceDate.value = new Date().toISOString().slice(0, 10);
    elements.invoiceId.value = generateNextInvoiceId();
    renderHistoryOptions();
    resetGoogleAdvancedState();
    loadEmailJsSettings();
    loadFormDraft();
    if (elements.licenseBuildInfo) {
      elements.licenseBuildInfo.textContent = `App ID: ${APP_DISTRIBUTION_ID} • Key format: INVBUY-${APP_KEY_VERSION}-[APP_ID]`;
    }
    if (!verifyBuildIntegrity()) {
      applyTamperLock();
    }
    loadLicenseState();
      openImageFromQuery();
      loadAdminState();
    renderDownloadHistory();
    renderUpdateNotice();
    loadRemoteUpdateManifest();
	    resetTaskForm();
    bindEvents();
    updateLiveClock();
    window.setInterval(updateLiveClock, 1000);
	    renderTrialStatus();
    cleanupStrayScriptTextNodes();
	    renderInvoice();
  