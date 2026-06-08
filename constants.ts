export const DEMO_PDF_URL = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export const MOCK_DOC_CONTENT = `
Trace-based Just-in-Time Type Specialization for Dynamic Languages
The usage of dynamic languages such as JavaScript, Python, and Ruby has grown rapidly.
However, their performance still lags behind statically typed languages like Java or C++.
This paper introduces a trace-based compilation technique to improve performance.
The key idea is to identify "hot" execution paths (traces) and compile them to machine code.
We observed speedups of up to 10x on certain benchmarks.
The system records a sequence of operations as a trace.
It assumes types remain constant during the loop execution.
If a type check fails, execution falls back to the interpreter.
This approach allows for aggressive optimizations like constant folding and dead code elimination within the trace.
Memory management is handled via a specialized garbage collector.
`;

export const PASSING_SCORE = 75;
