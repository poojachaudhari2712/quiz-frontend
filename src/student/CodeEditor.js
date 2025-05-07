import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { motion } from 'framer-motion';
import axios from 'axios';

const CodeEditor = () => {
    const [code, setCode] = useState(`// Write your code here`);
    const [consoleOutput, setConsoleOutput] = useState('');
    const [language, setLanguage] = useState('javascript');

    const runCode = async () => {
        setConsoleOutput("// Running...");
        try {
            const response = await axios.post('http://localhost:5000/api/code/submitCode', {
                code,
                language,
            });
            setConsoleOutput(response.data.output || "// No output");
        } catch (err) {
            setConsoleOutput(err.response?.data?.message || err.message || "Error running code");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f111a] text-white flex flex-col items-center py-10 px-4">
            <motion.div
                className="w-full max-w-5xl flex justify-between items-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <label className="text-lg font-medium">
                    Language:
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="ml-2 px-2 py-1 bg-[#1e1e1e] border border-gray-600 rounded"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                </label>
            </motion.div>

            <motion.div
                className="w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <MonacoEditor
                    width="100%"
                    height="300"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(newValue) => setCode(newValue)}
                    options={{
                        selectOnLineNumbers: true,
                        automaticLayout: true,
                        fontSize: 16,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        formatOnType: true,
                        formatOnPaste: true,
                    }}
                />
            </motion.div>

            <motion.button
                onClick={runCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-md text-white font-semibold shadow-md"
            >
                Run Code
            </motion.button>

            <motion.div
                className="w-full max-w-5xl mt-6 bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap min-h-[120px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {consoleOutput || "// Output will appear here"}
            </motion.div>
        </div>
    );
};

export default CodeEditor;