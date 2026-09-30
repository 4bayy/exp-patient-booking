// "use client";

// export default function GlobalError({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-slate-50">
//         <main className="flex min-h-screen items-center justify-center px-6">
//           <div className="w-full max-w-xl rounded-2xl border bg-white p-10 shadow-lg text-center">
//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
//               <svg
//                 className="h-10 w-10 text-red-600"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M12 9v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>

//             <h1 className="mt-6 text-3xl font-bold text-slate-900">
//               Something went wrong
//             </h1>

//             <p className="mt-3 text-slate-600">
//               We're sorry, but the application encountered an unexpected error.
//               Please try again in a few moments.
//             </p>

//             {process.env.NODE_ENV === "development" && (
//               <pre className="mt-6 overflow-auto rounded-lg bg-slate-100 p-4 text-left text-sm text-red-600">
//                 {error.message}
//               </pre>
//             )}

//             <button
//               onClick={reset}
//               className="mt-8 rounded-lg bg-[#2C6B69] px-6 py-3 font-medium text-white hover:bg-[#245754]"
//             >
//               Reload Application
//             </button>
//           </div>
//         </main>
//       </body>
//     </html>
//   );
// }