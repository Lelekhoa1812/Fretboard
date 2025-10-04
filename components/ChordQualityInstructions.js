import { useState, useEffect } from 'react';

export default function ChordQualityInstructions({ isVisible, onClose }) {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Show instructions on first visit
    const hasSeenInstructions = localStorage.getItem('chord-quality-instructions-seen');
    if (!hasSeenInstructions && isVisible) {
      setShowInstructions(true);
    }
  }, [isVisible]);

  const handleClose = () => {
    setShowInstructions(false);
    localStorage.setItem('chord-quality-instructions-seen', 'true');
    if (onClose) onClose();
  };

  if (!showInstructions) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="instructions-backdrop"
        onClick={handleClose}
      />
      
      {/* Instructions Panel */}
      <div className="instructions-panel">
        <div className="instructions-header">
          <h3>🎸 New: Quick Chord Quality Selection!</h3>
          <button 
            className="instructions-close"
            onClick={handleClose}
            title="Close"
          >
            ×
          </button>
        </div>

        <div className="instructions-content">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>Regular Click:</strong> Select chord with current quality
              <div className="step-example">Click "C" → Selects C major</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>Ctrl + Click:</strong> Choose chord quality
              <div className="step-example">Ctrl+Click "C" → Opens quality selector</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>Select Quality:</strong> Choose from 12+ chord types
              <div className="step-example">Major, Minor, 7th, Sus2, Sus4, Add9, etc.</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <strong>Quick Actions:</strong> Use the quick buttons
              <div className="step-example">Major, Minor, 7th buttons for common types</div>
            </div>
          </div>
        </div>

        <div className="instructions-footer">
          <button 
            className="instructions-got-it"
            onClick={handleClose}
          >
            Got it! Let's try it out 🎵
          </button>
        </div>
      </div>

      <style jsx>{`
        .instructions-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .instructions-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(0, 186, 186, 0.3);
          z-index: 2001;
          max-width: 500px;
          width: 90%;
          animation: slideIn 0.4s ease;
        }

        .instructions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .instructions-header h3 {
          color: #00baba;
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .instructions-close {
          background: none;
          border: none;
          color: #b7c4d6;
          font-size: 28px;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .instructions-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .instructions-content {
          padding: 25px 30px;
        }

        .instruction-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 25px;
          gap: 15px;
        }

        .step-number {
          background: linear-gradient(135deg, #00baba 0%, #008a8a 100%);
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-content strong {
          color: #00baba;
          font-size: 16px;
          display: block;
          margin-bottom: 8px;
        }

        .step-example {
          background: rgba(0, 186, 186, 0.1);
          border: 1px solid rgba(0, 186, 186, 0.2);
          border-radius: 8px;
          padding: 8px 12px;
          color: #b7c4d6;
          font-size: 14px;
          font-family: 'Courier New', monospace;
          margin-top: 5px;
        }

        .instructions-footer {
          padding: 20px 30px 25px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .instructions-got-it {
          background: linear-gradient(135deg, #00baba 0%, #008a8a 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 186, 186, 0.3);
        }

        .instructions-got-it:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 186, 186, 0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @media (max-width: 768px) {
          .instructions-panel {
            width: 95%;
            max-width: none;
          }
          
          .instructions-header,
          .instructions-content,
          .instructions-footer {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}
