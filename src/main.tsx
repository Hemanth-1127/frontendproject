import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure there is a #root element; create it if missing
function ensureRootElement(): HTMLElement {
	let root = document.getElementById('root');
	if (!root) {
		root = document.createElement('div');
		root.id = 'root';
		document.body.appendChild(root);
	}
	return root as HTMLElement;
}

// Render with error handling and a visible fallback UI if something goes wrong
function renderApp() {
	const container = ensureRootElement();
	try {
		console.log('Starting React root render...');
		createRoot(container).render(
			<StrictMode>
				<App />
			</StrictMode>
		);
		console.log('React app rendered successfully');
	} catch (err) {
		console.error('Render error:', err);
		container.innerHTML = `<div style="color:#b00020;background:#fff6f6;padding:16px;font-family:monospace;white-space:pre-wrap;margin:16px;">Application failed to render:<br/>${String(
			err
		)}</div>`;
	}
}

// Try to render after DOM is ready, but also call immediately in case it's already loaded
if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', renderApp);
} else {
	renderApp();
}

window.addEventListener('error', (e: ErrorEvent) => {
	console.error('Unhandled error:', e);
	const root = document.getElementById('root');
	if (root) {
		root.innerHTML = `<div style="color:#b00020;background:#fff6f6;padding:16px;font-family:monospace;">Runtime error: ${e.message}</div>`;
	}
});
