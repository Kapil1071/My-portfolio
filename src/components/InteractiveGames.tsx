import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Check, Sparkles, Trophy, Zap, AlertCircle } from 'lucide-react';

// ==========================================
// GAME 1: RED LIGHT, GREEN LIGHT REACTION TEST
// ==========================================
export function ReactionTestGame() {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'fail'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('reaction_best_time');
    return saved ? parseInt(saved) : null;
  });
  const [message, setMessage] = useState('TAP START TO BOOT NEURAL REACTION TEST');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGameState('waiting');
    setMessage('WAIT FOR GREEN TRIGGER...');
    setReactionTime(null);
    
    // Random delay between 1.5s and 4.5s
    const delay = 1500 + Math.random() * 3000;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('CLICK NOW!!');
      startTimeRef.current = performance.now();
    }, delay);
  };

  const handleClickBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState === 'waiting') {
      // Clicked too early!
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('fail');
      setMessage('TOO EARLY! FALSE DISPATCH TRIPPED SIGNAL CORRUPTION.');
    } else if (gameState === 'ready') {
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTimeRef.current);
      setReactionTime(elapsed);
      setGameState('result');
      
      if (!bestTime || elapsed < bestTime) {
        setBestTime(elapsed);
        localStorage.setItem('reaction_best_time', elapsed.toString());
        setMessage(`NEW REFLEX REPLICA RECORD: ${elapsed}ms! S-RANK!`);
      } else {
        setMessage(`ELAPSED COMM SCAN: ${elapsed}ms. Keep optimizing!`);
      }
    }
  };

  const resetGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGameState('idle');
    setReactionTime(null);
    setMessage('TAP START TO RE-RUN CALIBRATION');
  };

  return (
    <div className="flex flex-col h-full justify-between" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none font-mono text-[10px]">
          <span className="text-[#00f3ff] font-bold">// MODULE_01: REACTION_GRID</span>
          {bestTime && (
            <span className="text-yellow-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-400" /> BEST: {bestTime}ms
            </span>
          )}
        </div>

        {/* Dynamic click zone styled like cockpit overlay */}
        <div 
          onClick={gameState === 'waiting' || gameState === 'ready' ? handleClickBubble : undefined}
          className={`
            h-32 
            border-2 
            border-black 
            flex 
            flex-col 
            items-center 
            justify-center 
            cursor-pointer 
            transition-all 
            duration-150 
            relative 
            overflow-hidden
            ${gameState === 'idle' ? 'bg-stone-900 border-dashed hover:bg-stone-800' : ''}
            ${gameState === 'waiting' ? 'bg-amber-600/90 text-white animate-pulse' : ''}
            ${gameState === 'ready' ? 'bg-[#00f3ff] text-black font-black scale-102' : ''}
            ${gameState === 'result' ? 'bg-emerald-700 text-white' : ''}
            ${gameState === 'fail' ? 'bg-[#ff007f] text-white' : ''}
          `}
        >
          <div className="halftone absolute inset-0 opacity-15 pointer-events-none" />
          
          {gameState === 'idle' && (
            <button 
              onClick={startTest}
              className="bg-white text-black font-['Bebas_Neue'] px-5 py-2 text-lg border-2 border-black hover:bg-yellow-400 shadow-[3px_3px_0px_#000] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" /> EXECUTE REACTION SENSOR
            </button>
          )}

          {gameState === 'waiting' && (
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-red-600 animate-ping mx-auto mb-1 border border-black" />
              <p className="text-sm font-bold font-mono tracking-widest text-red-100 uppercase">SYS_SIGNAL: RED</p>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="text-center font-mono">
              <p className="text-3xl font-black tracking-tighter uppercase font-['Bebas_Neue'] glitch-text">● FLUID GREEN TRIGGER ●</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-black">CLICK NOW AS FAST AS YOU CAN!</p>
            </div>
          )}

          {gameState === 'result' && (
            <div className="text-center p-2 font-mono">
              <p className="text-[#00f3ff] text-3xl font-black font-['Bebas_Neue']">{reactionTime} ms</p>
              <p className="text-xs font-bold uppercase tracking-wide">Reflex Rate Saved</p>
            </div>
          )}

          {gameState === 'fail' && (
            <div className="text-center p-2">
              <AlertCircle className="w-6 h-6 mx-auto mb-1 animate-bounce text-white" />
              <p className="text-xs uppercase font-mono font-bold">SIGNAL TIMEOUT / EARLIER HIT</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/40 border border-stone-800 p-2 font-mono text-[9px] text-gray-300 mt-2 flex justify-between items-center select-none">
        <span className="truncate max-w-[190px] uppercase">{message}</span>
        {(gameState === 'result' || gameState === 'fail') && (
          <button 
            onClick={resetGame}
            className="bg-stone-800 hover:bg-stone-700 text-[#00f3ff] border border-[#00f3ff] p-1 font-bold cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}


// ==========================================
// GAME 2: NEO TIC-TAC-TOE VS AI BOT
// ==========================================
export function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [message, setMessage] = useState('YOUR MOVE (CYAN X) // BOT WAITING');

  const winningSelections = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (squares: (string | null)[]) => {
    for (let i = 0; i < winningSelections.length; i++) {
      const [a, b, c] = winningSelections[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: winningSelections[i] };
      }
    }
    if (squares.every(s => s !== null)) {
      return { winner: 'TIE', line: null };
    }
    return null;
  };

  const handleClickCell = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X'; // User is always X (neon cyan)
    setBoard(newBoard);
    setIsXNext(false);
    setMessage('BOT THINKING OVER CHASSIS...');

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setMessage(result.winner === 'TIE' ? 'SECTOR PARITY REACHED // GAME TIE' : `GRID VICTOR DETECTED: [ ${result.winner} ]`);
    }
  };

  // Bot makes a move matching optimal tactics
  useEffect(() => {
    if (isXNext || winner) return;

    const timer = setTimeout(() => {
      // Find empty indexes
      const emptyCells = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
      if (emptyCells.length === 0) return;

      let chosenIndex = emptyCells[0];

      // Smart Bot Tactic:
      // 1. Can bot win?
      let foundMove = false;
      for (let i = 0; i < emptyCells.length; i++) {
        const testBoard = [...board];
        testBoard[emptyCells[i]] = 'O';
        if (checkWinner(testBoard)?.winner === 'O') {
          chosenIndex = emptyCells[i];
          foundMove = true;
          break;
        }
      }

      // 2. Can bot block user?
      if (!foundMove) {
        for (let i = 0; i < emptyCells.length; i++) {
          const testBoard = [...board];
          testBoard[emptyCells[i]] = 'X';
          if (checkWinner(testBoard)?.winner === 'X') {
            chosenIndex = emptyCells[i];
            foundMove = true;
            break;
          }
        }
      }

      // 3. Just choose central or corner if available
      if (!foundMove) {
        if (emptyCells.includes(4)) {
          chosenIndex = 4;
        } else {
          chosenIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
      }

      const finalBoard = [...board];
      finalBoard[chosenIndex] = 'O';
      setBoard(finalBoard);
      setIsXNext(true);
      setMessage('YOUR NEXT TRANSMISSION TURN');

      const finalResult = checkWinner(finalBoard);
      if (finalResult) {
        setWinner(finalResult.winner);
        setWinningLine(finalResult.line);
        setMessage(finalResult.winner === 'TIE' ? 'SECTOR PARITY REACHED // GAME TIE' : `GRID VICTOR DETECTED: [ ${finalResult.winner} ]`);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [board, isXNext, winner]);

  const resetGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setMessage('YOUR MOVE (CYAN X) // BOT WAITING');
  };

  return (
    <div className="flex flex-col h-full justify-between" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none font-mono text-[10px]">
          <span className="text-[#ff007f] font-bold">// MODULE_02: CYBER_TTT</span>
          <span className="text-stone-400 capitalize">VS DECK_BOT.v1</span>
        </div>

        {/* 3x3 Grid Board */}
        <div className="grid grid-cols-3 gap-2 bg-stone-900 border-2 border-black p-2 relative">
          <div className="halftone absolute inset-0 opacity-10 pointer-events-none" />
          {board.map((cell, idx) => {
            const isWinnerCell = winningLine?.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleClickCell(idx, e)}
                className={`
                  h-[36px] 
                  border-2 
                  border-black 
                  text-lg 
                  font-['Bebas_Neue'] 
                  tracking-widest 
                  flex 
                  items-center 
                  justify-center 
                  transition-all 
                  duration-100
                  ${cell === null ? 'bg-black hover:bg-[#111] text-transparent' : ''}
                  ${cell === 'X' ? 'bg-[#050505] text-[#00f3ff]' : ''}
                  ${cell === 'O' ? 'bg-[#050505] text-[#ff007f]' : ''}
                  ${isWinnerCell ? 'bg-yellow-400 text-black font-black' : ''}
                `}
              >
                {cell || ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-black/40 border border-stone-800 p-2 font-mono text-[9px] text-gray-300 mt-2 flex justify-between items-center select-none">
        <span className="truncate max-w-[190px] uppercase font-bold">{message}</span>
        <button 
          onClick={resetGame}
          className="bg-stone-800 hover:bg-stone-700 text-[#ff007f] border border-[#ff007f] p-1 font-bold cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}


// ==========================================
// GAME 3: CYBERPLAY INTEL SUDOKU
// ==========================================
export function SudokuGame() {
  // A clean 6x6 Sudoku is perfect for playable layout without cluttering screen bounds
  const INITIAL_BOARDS = [
    {
      puzzle: [
        [1, 0, 3, 0, 0, 6],
        [0, 0, 6, 1, 3, 0],
        [3, 1, 0, 0, 6, 2],
        [6, 5, 0, 0, 1, 4],
        [0, 6, 1, 5, 0, 0],
        [5, 0, 0, 6, 0, 1]
      ],
      solution: [
        [1, 2, 3, 4, 5, 6],
        [4, 2, 6, 1, 3, 5], // note: just sample solvable sequences
        [3, 1, 4, 5, 6, 2],
        [6, 5, 2, 3, 1, 4],
        [2, 6, 1, 5, 4, 3],
        [5, 3, 4, 6, 2, 1]
      ]
    },
    {
      puzzle: [
        [0, 4, 0, 6, 0, 2],
        [6, 2, 3, 0, 4, 0],
        [0, 5, 0, 2, 0, 6],
        [2, 0, 6, 0, 5, 0],
        [0, 6, 0, 5, 2, 4],
        [4, 0, 5, 0, 6, 0]
      ],
      solution: [
        [5, 4, 1, 6, 3, 2],
        [6, 2, 3, 1, 4, 5],
        [1, 5, 4, 2, 3, 6],
        [2, 3, 6, 4, 5, 1],
        [3, 6, 1, 5, 2, 4],
        [4, 1, 5, 3, 6, 2]
      ]
    }
  ];

  const [boardIndex, setBoardIndex] = useState(0);
  const [grid, setGrid] = useState<number[][]>(() => JSON.parse(JSON.stringify(INITIAL_BOARDS[0].puzzle)));
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState('FILL RECTANGLES [1-6]. NO DUPLICATES IN GRID ROW/COL/BOX.');

  const handleInputChange = (r: number, c: number, val: string) => {
    const num = parseInt(val);
    if (isNaN(num) || num < 1 || num > 6) {
      const newGrid = [...grid];
      newGrid[r][c] = 0;
      setGrid(newGrid);
    } else {
      const newGrid = [...grid];
      newGrid[r][c] = num;
      setGrid(newGrid);
    }
    setSuccess(null);
  };

  const checkSolution = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Validate rows, cols and 2x3 blocks
    let valid = true;
    
    // Check rows
    for (let r = 0; r < 6; r++) {
      const rowVals = grid[r].filter(v => v !== 0);
      if (rowVals.length !== 6 || new Set(rowVals).size !== 6) valid = false;
    }

    // Check columns
    for (let c = 0; c < 6; c++) {
      const colVals = [];
      for (let r = 0; r < 6; r++) {
        if (grid[r][c] !== 0) colVals.push(grid[r][c]);
      }
      if (colVals.length !== 6 || new Set(colVals).size !== 6) valid = false;
    }

    // Check 2x3 boxes
    for (let boxRow = 0; boxRow < 6; boxRow += 2) {
      for (let boxCol = 0; boxCol < 6; boxCol += 3) {
        const boxVals = [];
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 3; c++) {
            const val = grid[boxRow + r][boxCol + c];
            if (val !== 0) boxVals.push(val);
          }
        }
        if (boxVals.length !== 6 || new Set(boxVals).size !== 6) valid = false;
      }
    }

    setSuccess(valid);
    if (valid) {
      setMessage('CORE ALIGNED! SUDOKU PROTOCOL DECRYPTED SUCCESSFULLY.');
    } else {
      setMessage('MISMATCH DISCOVERED! PLACEMENT CORRUPTING MATRICES.');
    }
  };

  const nextPuzzle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (boardIndex + 1) % INITIAL_BOARDS.length;
    setBoardIndex(nextIdx);
    setGrid(JSON.parse(JSON.stringify(INITIAL_BOARDS[nextIdx].puzzle)));
    setSuccess(null);
    setMessage('BOOTED SUB-SECTOR CONFIG. FILL NUMBERS 1 TO 6!');
  };

  return (
    <div className="flex flex-col h-full justify-between" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none font-mono text-[10px]">
          <span className="text-yellow-400 font-bold">// MODULE_03: QUANTUM_SUDOKU</span>
          <button 
            onClick={nextPuzzle}
            className="text-[9px] underline text-[#00f3ff] font-bold uppercase hover:bg-stone-900 border border-[#00f3ff] px-1 py-0.5 cursor-pointer"
          >
            ROTATE PUZZLE
          </button>
        </div>

        {/* 6x6 Sudoku Board Grid */}
        <div className="grid grid-cols-6 gap-0.5 bg-black border-2 border-black p-1 relative max-w-[200px] mx-auto select-none">
          <div className="halftone absolute inset-0 opacity-10 pointer-events-none" />
          {grid.map((row, r) => 
            row.map((val, c) => {
              const isReadOnly = INITIAL_BOARDS[boardIndex].puzzle[r][c] !== 0;
              // Styling thicker borders for the 2x3 grids
              const borderBottomClass = r === 1 || r === 3 ? 'border-b-2 border-b-[#00f3ff]' : '';
              const borderRightClass = c === 2 ? 'border-r-2 border-r-[#00f3ff]' : '';
              return (
                <div 
                  key={`${r}-${c}`}
                  className={`relative flex items-center justify-center p-0.5 bg-stone-900 ${borderBottomClass} ${borderRightClass}`}
                >
                  {isReadOnly ? (
                    <span className="text-xs font-['Bebas_Neue'] font-bold text-white w-full text-center py-1">
                      {val}
                    </span>
                  ) : (
                    <input
                      type="text"
                      className="w-full text-center text-xs font-['Bebas_Neue'] bg-black text-yellow-400 font-black focus:outline-none border border-stone-800 focus:border-[#ff007f] p-0.5"
                      maxLength={1}
                      value={val === 0 ? '' : val}
                      onChange={(e) => handleInputChange(r, c, e.target.value)}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Control panel and logs */}
      <div className="bg-black/40 border border-stone-800 p-1.5 font-mono text-[9px] text-gray-300 mt-2 flex justify-between items-center">
        <span className="truncate max-w-[150px] uppercase">{message}</span>
        <button 
          onClick={checkSolution}
          className="bg-black hover:bg-stone-800 border-2 border-yellow-400 text-yellow-400 text-[8px] font-bold px-2 py-1 flex items-center gap-1 shrink-0 uppercase cursor-pointer"
        >
          <Check className="w-2.5 h-2.5" /> VERIFY MATRIX
        </button>
      </div>
    </div>
  );
}


// ==========================================
// GAME 4: SPEED REFLEX BUBBLE TAPPER
// ==========================================
export function ReflexBubbleGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('reflex_pop_high');
    return saved ? parseInt(saved) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [message, setMessage] = useState('TAP PLAY & SMASH NEON CORES INSTANTLY');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean-up hooks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, []);

  const startGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(15);
    setActiveCell(Math.floor(Math.random() * 9));
    setMessage('STRIKE NEON CIRCLES NOW!');

    if (timerRef.current) clearInterval(timerRef.current);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);

    // Keep shifting active cell speedier
    gameIntervalRef.current = setInterval(() => {
      setActiveCell(Math.floor(Math.random() * 9));
    }, 750);

    // Countdown second ticker
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          clearInterval(gameIntervalRef.current!);
          setIsPlaying(false);
          setActiveCell(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Click on bubbles
  const handleBubbleClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    if (index === activeCell) {
      const nextScore = score + 1;
      setScore(nextScore);
      setActiveCell(Math.floor(Math.random() * 9));
      
      // Track highscore
      if (nextScore > highScore) {
        setHighScore(nextScore);
        localStorage.setItem('reflex_pop_high', nextScore.toString());
      }
    } else {
      // penalty click!
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  // Rank messaging matching shonen elements
  useEffect(() => {
    if (!isPlaying && timeLeft === 0) {
      let rank = "GENIN";
      if (score >= 12) rank = "S-RANK JOUNIN";
      else if (score >= 8) rank = "CHUNIN SPECIALIST";
      
      setMessage(`GRID CALIBRATION COMPLETE! SCORE: ${score} [ RANK: ${rank} ]`);
    }
  }, [isPlaying, timeLeft, score]);

  return (
    <div className="flex flex-col h-full justify-between" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none font-mono text-[10px]">
          <span className="text-[#00f3ff] font-bold">// MODULE_04: REFLEX_TAPPER</span>
          <span className="text-yellow-400 font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3 text-yellow-400" /> MAX: {highScore} pts
          </span>
        </div>

        {/* Play interface grids */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-900 border-2 border-black">
            {Array.from({ length: 9 }).map((_, idx) => {
              const isActive = idx === activeCell;
              return (
                <button
                  key={idx}
                  onClick={(e) => handleBubbleClick(idx, e)}
                  disabled={!isPlaying}
                  className={`
                    h-[32px] 
                    border 
                    border-black 
                    transition-all 
                    duration-75 
                    relative 
                    overflow-hidden
                    ${isPlaying ? 'cursor-crosshair' : 'cursor-not-allowed'}
                    ${isActive ? 'bg-[#ff007f] scale-102 ring-2 ring-[#00f3ff]' : 'bg-black hover:bg-[#111]'}
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center font-['Bebas_Neue'] text-white text-[10px] uppercase font-black animate-ping text-center">
                      FIT
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick overlay buttons if inactive */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-2 p-3 text-center border border-black">
              <span className="text-stone-400 uppercase font-mono text-[9px]">SPEED TAPPING TRIAL // 15s TIMER</span>
              <button
                onClick={startGame}
                className="bg-[#00f3ff] text-black font-['Bebas_Neue'] px-4 py-1 text-sm font-bold border-2 border-black hover:bg-yellow-400 uppercase shadow-[3px_3px_0px_rgba(255,0,127,1)] cursor-pointer flex items-center gap-1 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> RUN TAP MATRIX
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/40 border border-stone-800 p-2 font-mono text-[9px] text-gray-300 mt-2 flex justify-between items-center select-none">
        <span className="truncate max-w-[190px] uppercase">{message}</span>
        {isPlaying && (
          <span className="text-[#0ff3ff] font-bold bg-[#ff007f] px-1 text-[9px] shrink-0 border border-black animate-pulse">
            {timeLeft}s // {score}PTS
          </span>
        )}
      </div>
    </div>
  );
}
