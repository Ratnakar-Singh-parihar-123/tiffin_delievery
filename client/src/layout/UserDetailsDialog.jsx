// //   // // src/layout/UserDetailsDialog.jsx
// //   // import { useMemo, useState, useEffect } from "react";
// //   // import { calculatePrice } from "@/utils/pricing";
// //   // import {
// //   //   getUserById,
// //   //   markDeliveredForUser,
// //   //   toggleDeliveryForUser,
// //   //   updateUserQtyAndType,
// //   // } from "@/utils/storage";


// //   // function formatDateYYYYMMDD(d) {
// //   //   return d.toISOString().slice(0, 10);
// //   // }

// //   // export default function UserDetailsDialog({
// //   //   userId,
// //   //   open,
// //   //   onClose,
// //   //   onSaved,
// //   // }) {
// //   //   // ✅ Always call hooks in same order
// //   //   const [localUser, setLocalUser] = useState(null);
// //   //   const [selectedDate, setSelectedDate] = useState(formatDateYYYYMMDD(new Date()));

// //   //   // ✅ Keep user data in sync when dialog opens or userId changes
// //   //   useEffect(() => {
// //   //     if (open && userId) {
// //   //       const u = getUserById(userId);
// //   //       setLocalUser(u ? { ...u } : null);
// //   //     } else if (!open) {
// //   //       // Reset state when closed
// //   //       setLocalUser(null);
// //   //     }
// //   //   }, [userId, open]);

// //   //   // ✅ Stable memo calculation
// //   //   const price = useMemo(() => {
// //   //     if (!localUser) return 0;
// //   //     return calculatePrice(localUser.milkType, localUser.qty);
// //   //   }, [localUser]);

// //   //   // ✅ Small calendar (always stable)
// //   //   const daysWindow = useMemo(() => {
// //   //     const today = new Date(selectedDate);
// //   //     const arr = [];
// //   //     for (let i = -3; i <= 3; i++) {
// //   //       const d = new Date(today);
// //   //       d.setDate(today.getDate() + i);
// //   //       arr.push(d);
// //   //     }
// //   //     return arr;
// //   //   }, [selectedDate]);

// //   //   // ✅ Render guard AFTER all hooks
// //   //   if (!open || !localUser) return null;

// //   //   // =====================
// //   //   // Handlers
// //   //   // =====================
// //   //   const handleSave = () => {
// //   //     updateUserQtyAndType(localUser.id, localUser.qty, localUser.milkType);
// //   //     if (onSaved) onSaved();
// //   //     onClose();
// //   //   };

// //   //   const handleMarkDelivered = () => {
// //   //     markDeliveredForUser(localUser.id, selectedDate);
// //   //     if (onSaved) onSaved();
// //   //     const u = getUserById(localUser.id);
// //   //     setLocalUser({ ...u });
// //   //   };

// //   //   const handleToggleDay = (dateStr) => {
// //   //     toggleDeliveryForUser(localUser.id, dateStr);
// //   //     const u = getUserById(localUser.id);
// //   //     setLocalUser({ ...u });
// //   //     if (onSaved) onSaved();
// //   //   };

// //   //   const isDeliveredToday = !!(localUser.deliveryLog && localUser.deliveryLog[selectedDate]);

// //   //   // =====================
// //   //   // Render
// //   //   // =====================
// //   //   return (
// //   //     <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
// //   //       <div
// //   //         className="absolute inset-0 bg-black/40"
// //   //         onClick={onClose}
// //   //         aria-hidden
// //   //       />
// //   //       <div className="relative w-full md:w-3/5 bg-white rounded-t-3xl md:rounded-2xl p-4 shadow-xl animate-slide-up">
// //   //         <div className="flex items-center justify-between mb-3">
// //   //           <div>
// //   //             <p className="text-lg font-semibold text-sky-800">{localUser.name}</p>
// //   //             <p className="text-xs text-gray-500">{localUser.phone}</p>
// //   //           </div>
// //   //           <button
// //   //             onClick={onClose}
// //   //             className="px-3 py-1 rounded-lg bg-gray-100 text-sm"
// //   //           >
// //   //             Close
// //   //           </button>
// //   //         </div>

// //   //         <div className="space-y-3">

//   //           {/* Meal Info */}
//   //           <div className="p-3 bg-sky-50 rounded-xl">
//   //             <p className="text-sm text-gray-600">{localUser.address}</p>
//   //             <div className="flex flex-col sm:flex-row gap-2 mt-2">
//   //               <label className="text-xs">Meal Type</label>
//   //               <select
//   //                 value={localUser.mealType}
//   //                 onChange={(e) =>
//   //                   setLocalUser((s) => ({ ...s, mealType: e.target.value }))
//   //                 }
//   //                 className="ml-2 px-2 py-1 rounded-lg border w-full sm:w-auto"
//   //               >
//   //                 <option value="breakfast">Breakfast</option>
//   //                 <option value="lunch">Lunch</option>
//   //                 <option value="dinner">Dinner</option>
//   //               </select>

//   //               <label className="text-xs">Meals/Day</label>
//   //               <input
//   //                 type="number"
//   //                 min="1"
//   //                 max="5"
//   //                 value={localUser.mealsCount}
//   //                 onChange={(e) =>
//   //                   setLocalUser((s) => ({ ...s, mealsCount: Number(e.target.value) }))
//   //                 }
//   //                 className="w-full sm:w-24 ml-2 px-2 py-1 rounded-lg border"
//   //               />
//   //             </div>

// //   //             <div className="mt-2 flex items-center justify-between">
// //   //               <p className="text-sm text-gray-700">
// //   //                 Price per day: <span className="font-semibold">₹{price}</span>
// //   //               </p>
// //   //               <p className="text-sm text-gray-700">
// //   //                 Last month:{" "}
// //   //                 <span className="font-semibold">
// //   //                   ₹{localUser.lastMonthTotal ?? 0}
// //   //                 </span>
// //   //               </p>
// //   //             </div>
// //   //             <p className="text-sm text-red-600 mt-1">
// //   //               Due: ₹{localUser.due ?? 0}
// //   //             </p>
// //   //           </div>

// //   //           {/* Delivery Calendar */}
// //   //           <div className="p-3 bg-white rounded-xl border">
// //   //             <p className="text-sm font-medium text-gray-700 mb-2">
// //   //               Delivery Calendar
// //   //             </p>
// //   //             <div className="flex gap-2 overflow-x-auto">
// //   //               {daysWindow.map((d) => {
// //   //                 const dStr = d.toISOString().slice(0, 10);
// //   //                 const delivered = !!(
// //   //                   localUser.deliveryLog && localUser.deliveryLog[dStr]
// //   //                 );
// //   //                 return (
// //   //                   <button
// //   //                     key={dStr}
// //   //                     onClick={() => handleToggleDay(dStr)}
// //   //                     className={`min-w-[62px] p-2 rounded-lg shrink-0 flex flex-col items-center justify-center border ${
// //   //                       delivered
// //   //                         ? "bg-emerald-100 border-emerald-300"
// //   //                         : "bg-white"
// //   //                     }`}
// //   //                   >
// //   //                     <span className="text-xs">
// //   //                       {d.toLocaleString(undefined, { weekday: "short" })}
// //   //                     </span>
// //   //                     <span className="text-sm font-semibold">{d.getDate()}</span>
// //   //                     <span className="text-xs text-gray-500">
// //   //                       {delivered ? "✔" : "—"}
// //   //                     </span>
// //   //                   </button>
// //   //                 );
// //   //               })}
// //   //             </div>

// //   //             <div className="mt-3 flex items-center gap-2">
// //   //               <input
// //   //                 type="date"
// //   //                 value={selectedDate}
// //   //                 onChange={(e) => setSelectedDate(e.target.value)}
// //   //                 className="px-3 py-2 border rounded-lg"
// //   //               />
// //   //               <button
// //   //                 onClick={handleMarkDelivered}
// //   //                 className={`px-4 py-2 rounded-lg text-white ${
// //   //                   isDeliveredToday ? "bg-green-400" : "bg-sky-500"
// //   //                 }`}
// //   //               >
// //   //                 {isDeliveredToday
// //   //                   ? "Delivered Today"
// //   //                   : "Mark Delivered Today"}
// //   //               </button>
// //   //             </div>
// //   //           </div>

// //   //           {/* Buttons */}
// //   //           <div className="flex gap-2">
// //   //             <button
// //   //               onClick={handleSave}
// //   //               className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium"
// //   //             >
// //   //               Save Changes
// //   //             </button>
// //   //             <button
// //   //               onClick={onClose}
// //   //               className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700"
// //   //             >
// //   //               Cancel
// //   //             </button>
// //   //           </div>
// //   //         </div>
// //   //       </div>

// //   //       <style jsx>{`
// //   //         .animate-slide-up {
// //   //           animation: slideup 260ms ease;
// //   //         }
// //   //         @keyframes slideup {
// //   //           from {
// //   //             transform: translateY(24px);
// //   //             opacity: 0;
// //   //           }
// //   //           to {
// //   //             transform: translateY(0);
// //   //             opacity: 1;
// //   //           }
// //   //         } 
// //   //       `}</style>
// //   //     </div>
// //   //   );
// //   // }







// // // src/layout/UserDetailsDialog.jsx
// // // import { useMemo, useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import { calculatePrice } from "@/utils/pricing";
// // // import {
// // //   getUserById,
// // //   markDeliveredForUser,
// // //   toggleDeliveryForUser,
// // //   updateUserQtyAndType,
// // // } from "@/utils/storage";

// // // function formatDateYYYYMMDD(d) {
// // //   return d.toISOString().slice(0, 10);
// // // }

// // // export default function UserDetailsDialog({ userId, open, onClose, onSaved }) {
// // //   const [localUser, setLocalUser] = useState(null);
// // //   const [selectedDate, setSelectedDate] = useState(formatDateYYYYMMDD(new Date()));
// // //   const [showFullCalendar, setShowFullCalendar] = useState(false);

// // //   // Load user and mark previous dates as delivered
// // //   useEffect(() => {
// // //     if (open && userId) {
// // //       const u = getUserById(userId);
// // //       if (u) {
// // //         const todayStr = formatDateYYYYMMDD(new Date());
// // //         const deliveryLog = { ...u.deliveryLog };
// // //         Object.keys(deliveryLog).forEach((d) => {
// // //           if (d < todayStr) deliveryLog[d] = true;
// // //         });
// // //         setLocalUser({ ...u, deliveryLog });
// // //       }
// // //     } else if (!open) {
// // //       setLocalUser(null);
// // //       setShowFullCalendar(false);
// // //     }
// // //   }, [userId, open]);

// // //   const price = useMemo(() => {
// // //     if (!localUser) return 0;
// // //     return calculatePrice(localUser.milkType, localUser.qty);
// // //   }, [localUser]);

// // //   const thisMonthTotal = useMemo(() => {
// // //     if (!localUser || !localUser.deliveryLog) return 0;
// // //     const today = new Date();
// // //     const month = today.getMonth();
// // //     const year = today.getFullYear();
// // //     let total = 0;
// // //     Object.entries(localUser.deliveryLog).forEach(([dateStr, delivered]) => {
// // //       const d = new Date(dateStr);
// // //       if (delivered && d.getMonth() === month && d.getFullYear() === year) {
// // //         total += calculatePrice(localUser.milkType, localUser.qty);
// // //       }
// // //     });
// // //     return total;
// // //   }, [localUser]);

// // //   if (!open || !localUser) return null;

// // //   const handleSave = () => {
// // //     updateUserQtyAndType(localUser.id, localUser.qty, localUser.milkType);
// // //     if (onSaved) onSaved();
// // //     onClose();
// // //   };

// // //   const handleMarkDelivered = () => {
// // //     markDeliveredForUser(localUser.id, selectedDate);
// // //     const u = getUserById(localUser.id);
// // //     setLocalUser({ ...u });
// // //     if (onSaved) onSaved();
// // //   };

// // //   const handleToggleDay = (dateStr) => {
// // //     toggleDeliveryForUser(localUser.id, dateStr);
// // //     const u = getUserById(localUser.id);
// // //     setLocalUser({ ...u });
// // //     setSelectedDate(dateStr);
// // //     if (onSaved) onSaved();
// // //   };

// // //   const isDeliveredToday = !!(localUser.deliveryLog && localUser.deliveryLog[selectedDate]);

// // //   // Full month calendar (fixed)
// // //   const monthDays = useMemo(() => {
// // //     const today = new Date();
// // //     const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
// // //     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// // //     const days = [];
// // //     for (let i = 0; i < lastDay.getDate(); i++) {
// // //       days.push(new Date(today.getFullYear(), today.getMonth(), i + 1));
// // //     }
// // //     return days;
// // //   }, [selectedDate]);

// // //   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// // //   return (
// // //     <motion.div
// // //       className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //     >
// // //       <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

// // //       <motion.div
// // //         className="relative w-full md:w-4/5 lg:w-3/5 bg-white rounded-t-3xl md:rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
// // //         initial={{ y: 50 }}
// // //         animate={{ y: 0 }}
// // //         exit={{ y: 50 }}
// // //       >
// // //         {/* Header */}
// // //         <div className="flex items-center justify-between mb-4">
// // //           <div>
// // //             <p className="text-lg font-semibold text-sky-800">{localUser.name}</p>
// // //             <p className="text-xs text-gray-500">{localUser.phone}</p>
// // //           </div>
// // //           <button
// // //             onClick={onClose}
// // //             className="px-3 py-1 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 transition"
// // //           >
// // //             Close
// // //           </button>
// // //         </div>

// // //         {/* Address & Milk Info */}
// // //         <div className="space-y-4">
// // //           <div className="p-4 bg-sky-50 rounded-xl shadow-sm">
// // //             <p className="text-sm text-gray-600 font-medium">{localUser.address}</p>

// // //             <div className="flex items-center gap-4 mt-2 flex-wrap">
// // //               <div className="flex items-center gap-2">
// // //                 <label className="text-xs font-medium">Milk Type:</label>
// // //                 <select
// // //                   value={localUser.milkType}
// // //                   onChange={(e) =>
// // //                     setLocalUser((s) => ({ ...s, milkType: e.target.value }))
// // //                   }
// // //                   className="px-2 py-1 rounded-lg border text-sm"
// // //                 >
// // //                   <option value="cow">Cow</option>
// // //                   <option value="buffalo">Buffalo</option>
// // //                 </select>
// // //               </div>

// // //               <div className="flex items-center gap-2">
// // //                 <label className="text-xs font-medium">Quantity (L):</label>
// // //                 <input
// // //                   type="number"
// // //                   min="0.25"
// // //                   step="0.25"
// // //                   value={localUser.qty}
// // //                   onChange={(e) =>
// // //                     setLocalUser((s) => ({ ...s, qty: Number(e.target.value) }))
// // //                   }
// // //                   className="w-20 px-2 py-1 rounded-lg border text-sm"
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Totals */}
// // //             <div className="mt-3 flex flex-col gap-1">
// // //               <p className="text-sm text-gray-700">
// // //                 Price per day: <span className="font-semibold">₹{price}</span>
// // //               </p>
// // //               <p className="text-sm text-gray-700">
// // //                 This Month Total: <span className="font-semibold text-green-600">₹{thisMonthTotal}</span>
// // //               </p>
// // //               <p className="text-sm text-gray-700">
// // //                 Last Month Total: <span className="font-semibold text-blue-600">₹{localUser.lastMonthTotal ?? 0}</span>
// // //               </p>
// // //               <p className="text-sm text-red-600 font-semibold">
// // //                 Due: ₹{localUser.due ?? 0}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* Weekly / Full Month Calendar */}
// // //           <div className="p-4 bg-white rounded-xl border shadow-sm">
// // //             <div className="flex items-center justify-between mb-2">
// // //               <p className="text-sm font-medium text-gray-700">Delivery Calendar</p>
// // //               <button
// // //                 className="text-xs text-sky-600 hover:underline"
// // //                 onClick={() => setShowFullCalendar((s) => !s)}
// // //               >
// // //                 {showFullCalendar ? "Hide Full Month" : "Show Full Month"}
// // //               </button>
// // //             </div>

// // //             {/* Weekly View */}
// // //             {!showFullCalendar && (
// // //               <div className="flex gap-2 overflow-x-auto mb-2">
// // //                 {Array.from({ length: 7 }, (_, i) => {
// // //                   const d = new Date();
// // //                   d.setDate(d.getDate() + i - 3);
// // //                   const dStr = formatDateYYYYMMDD(d);
// // //                   const delivered = !!(localUser.deliveryLog && localUser.deliveryLog[dStr]);
// // //                   return (
// // //                     <motion.button
// // //                       key={dStr}
// // //                       onClick={() => handleToggleDay(dStr)}
// // //                       whileHover={{ scale: 1.1 }}
// // //                       className={`min-w-[62px] p-2 rounded-lg shrink-0 flex flex-col items-center justify-center border ${
// // //                         delivered ? "bg-emerald-100 border-emerald-300" : "bg-white border-gray-200"
// // //                       }`}
// // //                     >
// // //                       <span className="text-xs">{d.toLocaleString(undefined, { weekday: "short" })}</span>
// // //                       <span className="text-sm font-semibold">{d.getDate()}</span>
// // //                       <span className="text-xs text-gray-500">{delivered ? "✔" : "—"}</span>
// // //                     </motion.button>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}

// // //             {/* Full Month Calendar */}
// // //             {showFullCalendar && (
// // //               <div className="grid grid-cols-7 gap-1 text-center text-xs">
// // //                 {weekdays.map((w) => (
// // //                   <div key={w} className="font-semibold text-gray-500">{w}</div>
// // //                 ))}
// // //                 {monthDays.map((d) => {
// // //                   const dStr = formatDateYYYYMMDD(d);
// // //                   const delivered = !!(localUser.deliveryLog && localUser.deliveryLog[dStr]);
// // //                   const isToday = dStr === formatDateYYYYMMDD(new Date());
// // //                   return (
// // //                     <motion.button
// // //                       key={dStr}
// // //                       onClick={() => handleToggleDay(dStr)}
// // //                       whileHover={{ scale: 1.1 }}
// // //                       className={`p-2 rounded-lg border flex flex-col items-center justify-center ${
// // //                         delivered ? "bg-emerald-100 border-emerald-300" : "bg-white border-gray-200"
// // //                       } ${isToday ? "ring-2 ring-sky-400" : ""}`}
// // //                     >
// // //                       <span className="text-sm font-semibold">{d.getDate()}</span>
// // //                       <span className="text-[10px] text-gray-500">{delivered ? "✔" : ""}</span>
// // //                     </motion.button>
// // //                   );
// // //                 })}
// // //               </div>
// // //             )}

// // //             {/* Date Picker */}
// // //             <div className="mt-3 flex items-center gap-2">
// // //               <input
// // //                 type="date"
// // //                 value={selectedDate}
// // //                 onChange={(e) => setSelectedDate(e.target.value)}
// // //                 className="px-3 py-2 border rounded-lg text-sm"
// // //               />
// // //               <button
// // //                 onClick={handleMarkDelivered}
// // //                 className={`px-4 py-2 rounded-lg text-white ${
// // //                   isDeliveredToday ? "bg-green-400" : "bg-sky-500"
// // //                 }`}
// // //               >
// // //                 {isDeliveredToday ? "Delivered Today" : "Mark Delivered Today"}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="flex gap-2 mt-4">
// // //             <button
// // //               onClick={handleSave}
// // //               className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
// // //             >
// // //               Save Changes
// // //             </button>
// // //             <button
// // //               onClick={onClose}
// // //               className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     </motion.div>
// // //   );
// // // }



// // // src/layout/UserDetailsDialog.jsx
// // import { useMemo, useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { calculatePrice } from "@/utils/pricing";
// // import {
// //   getUserById,
// //   markDeliveredForUser,
// //   toggleDeliveryForUser,
// //   updateUserQtyAndType,
// // } from "@/utils/storage";

// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

// // function formatDateYYYYMMDD(d) {
// //   return d.toISOString().slice(0, 10);
// // }

// // export default function UserDetailsDialog({ userId, open, onClose, onSaved }) {
// //   const [localUser, setLocalUser] = useState(null);
// //   const [selectedDate, setSelectedDate] = useState(formatDateYYYYMMDD(new Date()));
// //   const [showFullCalendar, setShowFullCalendar] = useState(false);

// //   // New: Nested mini-dialog state
// //   const [dayDialogOpen, setDayDialogOpen] = useState(false);
// //   const [dayDialogData, setDayDialogData] = useState(null);

// //   useEffect(() => {
// //     if (open && userId) {
// //       const u = getUserById(userId);
// //       if (u) {
// //         const todayStr = formatDateYYYYMMDD(new Date());
// //         const deliveryLog = { ...u.deliveryLog };
// //         Object.keys(deliveryLog).forEach((d) => {
// //           if (d < todayStr) deliveryLog[d] = true;
// //         });
// //         setLocalUser({ ...u, deliveryLog });
// //       }
// //     } else if (!open) {
// //       setLocalUser(null);
// //       setShowFullCalendar(false);
// //     }
// //   }, [userId, open]);

// //   const price = useMemo(() => {
// //     if (!localUser) return 0;
// //     return calculatePrice(localUser.milkType, localUser.qty);
// //   }, [localUser]);

// //   const thisMonthTotal = useMemo(() => {
// //     if (!localUser || !localUser.deliveryLog) return 0;
// //     const today = new Date();
// //     const month = today.getMonth();
// //     const year = today.getFullYear();
// //     let total = 0;
// //     Object.entries(localUser.deliveryLog).forEach(([dateStr, delivered]) => {
// //       const d = new Date(dateStr);
// //       if (delivered && d.getMonth() === month && d.getFullYear() === year) {
// //         total += calculatePrice(localUser.milkType, localUser.qty);
// //       }
// //     });
// //     return total;
// //   }, [localUser]);

// //   const handleSave = () => {
// //     updateUserQtyAndType(localUser.id, localUser.qty, localUser.milkType);
// //     if (onSaved) onSaved();
// //     onClose();
// //   };

// //   const handleMarkDelivered = () => {
// //     markDeliveredForUser(localUser.id, selectedDate);
// //     const u = getUserById(localUser.id);
// //     setLocalUser({ ...u });
// //     if (onSaved) onSaved();
// //   };

// //   const handleToggleDay = (dateStr) => {
// //     // Open mini-dialog with day's details
// //     const delivered = !!localUser.deliveryLog?.[dateStr];
// //     setDayDialogData({
// //       date: dateStr,
// //       milkType: localUser.milkType,
// //       qty: localUser.qty,
// //       price: calculatePrice(localUser.milkType, localUser.qty),
// //       delivered,
// //     });
// //     setDayDialogOpen(true);
// //   };

// //   const isDeliveredToday = !!(localUser?.deliveryLog && localUser.deliveryLog[selectedDate]);

// //   const monthDays = useMemo(() => {
// //     const today = new Date();
// //     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// //     return Array.from({ length: lastDay.getDate() }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));
// //   }, [selectedDate]);

// //   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// //   if (!open || !localUser) return <div className="hidden" />; // placeholder to keep hooks order

// //   return (
// //     <>
// //       <motion.div
// //         className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         exit={{ opacity: 0 }}
// //       >
// //         <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

// //         <motion.div
// //           className="relative w-full md:w-4/5 lg:w-3/5 bg-white rounded-t-3xl md:rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
// //           initial={{ y: 50 }}
// //           animate={{ y: 0 }}
// //           exit={{ y: 50 }}
// //         >
// //           {/* Header */}
// //           <div className="flex items-center justify-between mb-4">
// //             <div>
// //               <p className="text-lg font-semibold text-sky-800">{localUser.name}</p>
// //               <p className="text-xs text-gray-500">{localUser.phone}</p>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="px-3 py-1 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 transition"
// //             >
// //               Close
// //             </button>
// //           </div>

// //           {/* Address & Milk Info */}
// //           <div className="space-y-4">
// //             <div className="p-4 bg-sky-50 rounded-xl shadow-sm">
// //               <p className="text-sm text-gray-600 font-medium">{localUser.address}</p>

// //               <div className="flex items-center gap-4 mt-2 flex-wrap">
// //                 <div className="flex items-center gap-2">
// //                   <label className="text-xs font-medium">Milk Type:</label>
// //                   <select
// //                     value={localUser.milkType}
// //                     onChange={(e) =>
// //                       setLocalUser((s) => ({ ...s, milkType: e.target.value }))
// //                     }
// //                     className="px-2 py-1 rounded-lg border text-sm"
// //                   >
// //                     <option value="cow">Cow</option>
// //                     <option value="buffalo">Buffalo</option>
// //                   </select>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <label className="text-xs font-medium">Quantity (L):</label>
// //                   <input
// //                     type="number"
// //                     min="0.25"
// //                     step="0.25"
// //                     value={localUser.qty}
// //                     onChange={(e) =>
// //                       setLocalUser((s) => ({ ...s, qty: Number(e.target.value) }))
// //                     }
// //                     className="w-20 px-2 py-1 rounded-lg border text-sm"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Totals */}
// //               <div className="mt-3 flex flex-col gap-1">
// //                 <p className="text-sm text-gray-700">
// //                   Price per day: <span className="font-semibold">₹{price}</span>
// //                 </p>
// //                 <p className="text-sm text-gray-700">
// //                   This Month Total: <span className="font-semibold text-green-600">₹{thisMonthTotal}</span>
// //                 </p>
// //                 <p className="text-sm text-gray-700">
// //                   Last Month Total: <span className="font-semibold text-blue-600">₹{localUser.lastMonthTotal ?? 0}</span>
// //                 </p>
// //                 <p className="text-sm text-red-600 font-semibold">
// //                   Due: ₹{localUser.due ?? 0}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Weekly / Full Month Calendar */}
// //             <div className="p-4 bg-white rounded-xl border shadow-sm">
// //               <div className="flex items-center justify-between mb-2">
// //                 <p className="text-sm font-medium text-gray-700">Delivery Calendar</p>
// //                 <button
// //                   className="text-xs text-sky-600 hover:underline"
// //                   onClick={() => setShowFullCalendar((s) => !s)}
// //                 >
// //                   {/* {showFullCalendar ? "Hide Full Month" : "Show Full Month"} */}
// //                 </button>
// //               </div>

// //               {/* Weekly / Full Month */}
// //               <div className="grid grid-cols-7 gap-1 text-center text-xs">
// //                 {weekdays.map((w) => (
// //                   <div key={w} className="font-semibold text-gray-500">{w}</div>
// //                 ))}
// //                 {monthDays.map((d) => {
// //                   const dStr = formatDateYYYYMMDD(d);
// //                   const delivered = !!(localUser.deliveryLog && localUser.deliveryLog[dStr]);
// //                   const todayStr = formatDateYYYYMMDD(new Date());
// //                   let bgClass = "bg-gray-100";
// //                   if (dStr < todayStr) bgClass = delivered ? "bg-emerald-200" : "bg-red-200";
// //                   if (dStr === todayStr) bgClass = "bg-blue-300";

// //                   return (
// //                     <motion.button
// //                       key={dStr}
// //                       onClick={() => handleToggleDay(dStr)}
// //                       whileHover={{ scale: 1.05 }}
// //                       className={`p-2 rounded-lg border flex flex-col items-center justify-center ${bgClass} ${dStr === todayStr ? "ring-2 ring-sky-400" : ""}`}
// //                     >
// //                       <span className="text-sm font-semibold">{d.getDate()}</span>
// //                       <span className="text-[10px] text-gray-500">{delivered ? "✔" : ""}</span>
// //                     </motion.button>
// //                   ); 
// //                 })}
// //               </div>
// //             </div>

// //             {/* Date Picker */}
// //             <div className="mt-3 flex items-center gap-2">
// //               <input
// //                 type="date"
// //                 value={selectedDate}
// //                 onChange={(e) => setSelectedDate(e.target.value)}
// //                 className="px-3 py-2 border rounded-lg text-sm"
// //               />
// //               <button
// //                 onClick={handleMarkDelivered}
// //                 className={`px-4 py-2 rounded-lg text-white ${isDeliveredToday ? "bg-green-400" : "bg-sky-500"}`}
// //               >
// //                 {isDeliveredToday ? "Delivered Today" : "Mark Delivered Today"}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex gap-2 mt-4">
// //             <button
// //               onClick={handleSave}
// //               className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
// //             >
// //               Save Changes
// //             </button>
// //             <button
// //               onClick={onClose}
// //               className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </motion.div>
// //       </motion.div>

// //       {/* Nested Day Dialog */}
// //       <Dialog open={dayDialogOpen} onOpenChange={setDayDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Delivery Details: {dayDialogData?.date}</DialogTitle>
// //           </DialogHeader>
// //           {dayDialogData && (
// //             <div className="space-y-2">
// //               <p>Milk Type: {dayDialogData.milkType}</p>
// //               <p>Quantity: {dayDialogData.qty} L</p>
// //               <p>Price: ₹{dayDialogData.price}</p>
// //               <p>Status: {dayDialogData.delivered ? "Delivered" : "Not Delivered"}</p>
// //             </div>
// //           )}
// //           <DialogFooter>
// //             <button
// //               className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
// //               onClick={() => setDayDialogOpen(false)}
// //             >
// //               Close
// //             </button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }

// // src/layout/UserDetailsDialog.jsx
// import { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { calculatePrice } from "@/utils/pricing";
// import {
//   getUserById,
//   markDeliveredForUser,
//   toggleDeliveryForUser,
//   updateUserQtyAndType,
// } from "@/utils/storage";

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// function formatDateYYYYMMDD(d) {
//   return d.toISOString().slice(0, 10);
// }

// export default function UserDetailsDialog({ userId, open, onClose, onSaved }) {
//   const [localUser, setLocalUser] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(formatDateYYYYMMDD(new Date()));
//   const [showFullCalendar, setShowFullCalendar] = useState(false);

//   // Nested mini-dialog state
//   const [dayDialogOpen, setDayDialogOpen] = useState(false);
//   const [dayDialogData, setDayDialogData] = useState(null);

//   useEffect(() => {
//     if (open && userId) {
//       const u = getUserById(userId);
//       if (u) {
//         const todayStr = formatDateYYYYMMDD(new Date());
//         const deliveryLog = { ...u.deliveryLog };
//         Object.keys(deliveryLog).forEach((d) => {
//           if (d < todayStr) deliveryLog[d] = true;
//         });
//         setLocalUser({ ...u, deliveryLog });
//       }
//     } else if (!open) {
//       setLocalUser(null);
//       setShowFullCalendar(false);
//     }
//   }, [userId, open]);

//   const price = useMemo(() => {
//     if (!localUser) return 0;
//     return calculatePrice(localUser.milkType, localUser.qty);
//   }, [localUser]);

//   const thisMonthTotal = useMemo(() => {
//     if (!localUser || !localUser.deliveryLog) return 0;
//     const today = new Date();
//     const month = today.getMonth();
//     const year = today.getFullYear();
//     let total = 0;
//     Object.entries(localUser.deliveryLog).forEach(([dateStr, delivered]) => {
//       const d = new Date(dateStr);
//       if (delivered && d.getMonth() === month && d.getFullYear() === year) {
//         total += calculatePrice(localUser.milkType, localUser.qty);
//       }
//     });
//     return total;
//   }, [localUser]);

//   const handleSave = () => {
//     updateUserQtyAndType(localUser.id, localUser.qty, localUser.milkType);
//     if (onSaved) onSaved();
//     onClose();
//   };

//   const handleMarkDelivered = () => {
//     markDeliveredForUser(localUser.id, selectedDate);
//     const u = getUserById(localUser.id);
//     setLocalUser({ ...u });
//     if (onSaved) onSaved();
//   };

//   const handleToggleDay = (dateStr) => {
//     const delivered = !!localUser.deliveryLog?.[dateStr];
//     const todayStr = formatDateYYYYMMDD(new Date());
//     const isFuture = dateStr > todayStr;

//     setDayDialogData({
//       date: dateStr,
//       milkType: localUser.milkType,
//       qty: localUser.qty,
//       price: calculatePrice(localUser.milkType, localUser.qty),
//       delivered: delivered && !isFuture,
//       isFuture,
//     });
//     setDayDialogOpen(true);
//   };

//   const isDeliveredToday = !!(localUser?.deliveryLog && localUser.deliveryLog[selectedDate]);

//   const monthDays = useMemo(() => {
//     const today = new Date();
//     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//     return Array.from({ length: lastDay.getDate() }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));
//   }, [selectedDate]);

//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   if (!open || !localUser) return <div className="hidden" />; // placeholder to keep hooks order

//   return (
//     <>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

//         <motion.div
//           className="relative w-full md:w-4/5 lg:w-3/5 bg-white rounded-t-3xl md:rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
//           initial={{ y: 50 }}
//           animate={{ y: 0 }}
//           exit={{ y: 50 }}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <p className="text-lg font-semibold text-sky-800">{localUser.name}</p>
//               <p className="text-xs text-gray-500">{localUser.phone}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="px-3 py-1 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 transition"
//             >
//               Close
//             </button>
//           </div>

//           {/* Address & Milk Info */}
//           <div className="space-y-4">
//             <div className="p-4 bg-sky-50 rounded-xl shadow-sm">
//               <p className="text-sm text-gray-600 font-medium">{localUser.address}</p>

//               <div className="flex items-center gap-4 mt-2 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium">Milk Type:</label>
//                   <select
//                     value={localUser.milkType}
//                     onChange={(e) =>
//                       setLocalUser((s) => ({ ...s, milkType: e.target.value }))
//                     }
//                     className="px-2 py-1 rounded-lg border text-sm"
//                   >
//                     <option value="cow">Cow</option>
//                     <option value="buffalo">Buffalo</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <label className="text-xs font-medium">Quantity (L):</label>
//                   <input
//                     type="number"
//                     min="0.25"
//                     step="0.25"
//                     value={localUser.qty}
//                     onChange={(e) =>
//                       setLocalUser((s) => ({ ...s, qty: Number(e.target.value) }))
//                     }
//                     className="w-20 px-2 py-1 rounded-lg border text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Totals */}
//               <div className="mt-3 flex flex-col gap-1">
//                 <p className="text-sm text-gray-700">
//                   Price per day: <span className="font-semibold">₹{price}</span>
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   This Month Total: <span className="font-semibold text-green-600">₹{thisMonthTotal}</span>
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   Last Month Total: <span className="font-semibold text-blue-600">₹{localUser.lastMonthTotal ?? 0}</span>
//                 </p>
//                 <p className="text-sm text-red-600 font-semibold">
//                   Due: ₹{localUser.due ?? 0}
//                 </p>
//               </div>
//             </div>

//             {/* Weekly / Full Month Calendar */}
//             <div className="p-4 bg-white rounded-xl border shadow-sm">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-sm font-medium text-gray-700">Delivery Calendar</p>
//                 <button
//                   className="text-xs text-sky-600 hover:underline"
//                   onClick={() => setShowFullCalendar((s) => !s)}
//                 >
//                   {/* Toggle Full Month */}
//                 </button>
//               </div>

//               <div className="grid grid-cols-7 gap-1 text-center text-xs">
//                 {weekdays.map((w) => (
//                   <div key={w} className="font-semibold text-gray-500">{w}</div>
//                 ))}
//                 {monthDays.map((d) => {
//                   const dStr = formatDateYYYYMMDD(d);
//                   const delivered = !!(localUser.deliveryLog && localUser.deliveryLog[dStr]);
//                   const todayStr = formatDateYYYYMMDD(new Date());
//                   const isFuture = dStr > todayStr;

//                   let bgClass = "bg-gray-100";
//                   if (!isFuture) bgClass = delivered ? "bg-emerald-200" : "bg-red-200";
//                   if (dStr === todayStr) bgClass = "bg-blue-300";

//                   return (
//                     <motion.button
//                       key={dStr}
//                       onClick={() => handleToggleDay(dStr)}
//                       whileHover={{ scale: 1.05 }}
//                       className={`p-2 rounded-lg border flex flex-col items-center justify-center ${bgClass} ${dStr === todayStr ? "ring-2 ring-sky-400" : ""}`}
//                     >
//                       <span className="text-sm font-semibold">{d.getDate()}</span>
//                       <span className="text-[10px] text-gray-500">{!isFuture && delivered ? "✔" : ""}</span>
//                     </motion.button>
//                   ); 
//                 })}
//               </div>
//             </div>

//             {/* Date Picker */}
//             <div className="mt-3 flex items-center gap-2">
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="px-3 py-2 border rounded-lg text-sm"
//               />
//               <button
//                 onClick={handleMarkDelivered}
//                 className={`px-4 py-2 rounded-lg text-white ${isDeliveredToday ? "bg-green-400" : "bg-sky-500"}`}
//               >
//                 {isDeliveredToday ? "Delivered Today" : "Mark Delivered Today"}
//               </button>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={handleSave}
//               className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Nested Day Dialog */}
//       <Dialog open={dayDialogOpen} onOpenChange={setDayDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delivery Details: {dayDialogData?.date}</DialogTitle>
//           </DialogHeader>
//           {dayDialogData && (
//             <div className="space-y-2">
//               {/* Editable milk type */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium">Milk Type:</label>
//                 <select
//                   value={dayDialogData.milkType}
//                   onChange={(e) => {
//                     const newMilkType = e.target.value;
//                     setDayDialogData((s) => ({
//                       ...s,
//                       milkType: newMilkType,
//                       price: calculatePrice(newMilkType, s.qty),
//                     }));
//                   }}
//                   className="px-2 py-1 border rounded-lg text-sm"
//                 >
//                   <option value="cow">Cow</option>
//                   <option value="buffalo">Buffalo</option>
//                 </select>
//               </div>

//               {/* Editable quantity */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium">Quantity (L):</label>
//                 <input
//                   type="number"
//                   min="0.25"
//                   step="0.25"
//                   value={dayDialogData.qty}
//                   onChange={(e) => {
//                     const newQty = Number(e.target.value);
//                     setDayDialogData((s) => ({
//                       ...s,
//                       qty: newQty,
//                       price: calculatePrice(s.milkType, newQty),
//                     }));
//                   }}
//                   className="w-24 px-2 py-1 border rounded-lg text-sm"
//                 />
//               </div>

//               <p>Price: ₹{dayDialogData.price}</p>
//               <p>Status: {dayDialogData.delivered ? "Delivered" : "Not Delivered"}</p>
//               {dayDialogData.isFuture && <p className="text-xs text-gray-500">Future day – cannot mark delivered yet</p>}
//             </div>
//           )}
//           <DialogFooter className="flex gap-2">
//             <button
//               className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
//               onClick={() => {
//                 // Update localUser with new milkType and qty for this date
//                 const updatedUser = { ...localUser };
//                 updatedUser.milkType = dayDialogData.milkType;
//                 updatedUser.qty = dayDialogData.qty;
//                 setLocalUser(updatedUser);

//                 setDayDialogOpen(false);
//                 if (onSaved) onSaved();
//               }}
//             >
//               Save
//             </button>
//             <button
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               onClick={() => setDayDialogOpen(false)}
//             >
//               Close
//             </button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


// src/layout/UserDetailsDialog.jsx
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calculatePrice } from "@/utils/pricing";
import {
  getUserById,
  markDeliveredForUser,
  updateUserQtyAndType,
} from "@/utils/storage";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

function formatDateYYYYMMDD(d) {
  return d.toISOString().slice(0, 10);
}

export default function UserDetailsDialog({ userId, open, onClose, onSaved }) {
  const [localUser, setLocalUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDateYYYYMMDD(new Date()));
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  // Nested mini-dialog state
  const [dayDialogOpen, setDayDialogOpen] = useState(false);
  const [dayDialogData, setDayDialogData] = useState(null);

  useEffect(() => {
    if (open && userId) {
      const u = getUserById(userId);
      if (u) {
        const todayStr = formatDateYYYYMMDD(new Date());
        const deliveryLog = { ...u.deliveryLog };
        Object.keys(deliveryLog).forEach((d) => {
          if (d < todayStr) deliveryLog[d] = deliveryLog[d] ?? false; // past dates remain as delivered/not delivered
        });
        // Migrate milkType/qty to mealType/mealsCount if needed
        setLocalUser({
          ...u,
          mealType: u.mealType || "breakfast",
          mealsCount: u.mealsCount || 1,
          deliveryLog,
        });
      }
    } else if (!open) {
      setLocalUser(null);
      setShowFullCalendar(false);
    }
  }, [userId, open]);

  const price = useMemo(() => {
    if (!localUser) return 0;
    return calculatePrice(localUser.mealType, localUser.mealsCount);
  }, [localUser]);

  const thisMonthTotal = useMemo(() => {
    if (!localUser || !localUser.deliveryLog) return 0;
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    let total = 0;
    Object.entries(localUser.deliveryLog).forEach(([dateStr, delivered]) => {
      const d = new Date(dateStr);
      if (delivered && d.getMonth() === month && d.getFullYear() === year) {
        total += calculatePrice(localUser.mealType, localUser.mealsCount);
      }
    });
    return total;
  }, [localUser]);

  const handleSave = () => {
  updateUserQtyAndType(localUser.id, localUser.mealsCount, localUser.mealType);
    if (onSaved) onSaved();
    onClose();
  };

  const handleMarkDelivered = () => {
  markDeliveredForUser(localUser.id, selectedDate);
  const u = getUserById(localUser.id);
  setLocalUser({ ...u });
  if (onSaved) onSaved();
  };

  const handleToggleDay = (dateStr) => {
    const delivered = !!localUser.deliveryLog?.[dateStr];
    const todayStr = formatDateYYYYMMDD(new Date());
    const isFuture = dateStr > todayStr;

    setDayDialogData({
      date: dateStr,
      mealType: localUser.mealType,
      mealsCount: localUser.mealsCount,
      price: calculatePrice(localUser.mealType, localUser.mealsCount),
      delivered: delivered && !isFuture,
      isFuture,
    });
    setDayDialogOpen(true);
  };

  const isDeliveredToday = !!(localUser?.deliveryLog && localUser.deliveryLog[selectedDate]);

  const monthDays = useMemo(() => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return Array.from({ length: lastDay.getDate() }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));
  }, [selectedDate]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!open || !localUser) return <div className="hidden" />; // placeholder

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

        <motion.div
          className="relative w-full md:w-4/5 lg:w-3/5 bg-white rounded-t-3xl md:rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-semibold text-sky-800">{localUser.name}</p>
              <p className="text-xs text-gray-500">{localUser.phone}</p>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>

          {/* Address & Meal Info */}
          <div className="space-y-4">
            <div className="p-4 bg-sky-50 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 font-medium">{localUser.address}</p>

              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium">Meal Type:</label>
                  <select
                    value={localUser.mealType}
                    onChange={(e) =>
                      setLocalUser((s) => ({ ...s, mealType: e.target.value }))
                    }
                    className="px-2 py-1 rounded-lg border text-sm"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium">Quantity (per meal):</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={localUser.mealsCount}
                    onChange={(e) =>
                      setLocalUser((s) => ({ ...s, mealsCount: Number(e.target.value) }))
                    }
                    className="w-20 px-2 py-1 rounded-lg border text-sm"
                  />
                </div>
              </div>

              {/* Totals */}
              <div className="mt-3 flex flex-col gap-1">
                <p className="text-sm text-gray-700">
                  Price per day: <span className="font-semibold">₹{price}</span>
                </p>
                <p className="text-sm text-gray-700">
                  This Month Total: <span className="font-semibold text-green-600">₹{thisMonthTotal}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Last Month Total: <span className="font-semibold text-blue-600">₹{localUser.lastMonthTotal ?? 0}</span>
                </p>
                <p className="text-sm text-red-900 font-semibold">
                  Due: ₹{localUser.due ?? 0}
                </p>
              </div>
            </div>

            {/* Calendar */}
            {/* <div className="p-4 bg-white rounded-xl border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Delivery Calendar</p>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {weekdays.map((w) => (
                  <div key={w} className="font-semibold text-gray-500">{w}</div>
                ))}

                {monthDays.map((d) => {
                  const dStr = formatDateYYYYMMDD(d);
                  const delivered = !!(localUser.deliveryLog && localUser.deliveryLog[dStr]);
                  const todayStr = formatDateYYYYMMDD(new Date());
                  const isFuture = dStr > todayStr;

                  let bgClass = "bg-gray-100"; // future
                  let textClass = "text-gray-700";

                  if (dStr === todayStr) {
                    bgClass = "bg-blue-300";
                    textClass = "font-semibold text-white";
                  } else if (!isFuture) {
                    if (delivered) {
                      bgClass = "bg-emerald-200";
                      textClass = "text-green-800 font-semibold";
                    } else {
                      bgClass = "bg-red-200";
                      textClass = "text-red-800 font-semibold";
                    }
                  }

                  return (
                    <motion.button
                      key={dStr}
                      onClick={() => handleToggleDay(dStr)}
                      whileHover={{ scale: 1.05 }}
                      className={`p-2 rounded-lg border flex flex-col items-center justify-center ${bgClass}`}
                    >
                      <span className={`text-sm ${textClass}`}>{d.getDate()}</span>
                      {!isFuture && delivered && <span className="text-[10px] text-green-700">✔</span>}
                    </motion.button>
                  ); 
                })}
              </div>
            </div> */}

            {/* Date Picker */}
            {/* <div className="mt-3 flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              />
              <button
                onClick={handleMarkDelivered}
                className={`px-4 py-2 rounded-lg text-white ${isDeliveredToday ? "bg-green-400" : "bg-sky-500"}`}
              >
                {isDeliveredToday ? "Delivered Today" : "Mark Delivered Today"}
              </button>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Nested Day Dialog */}
      <Dialog open={dayDialogOpen} onOpenChange={setDayDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delivery Details: {dayDialogData?.date}</DialogTitle>
          </DialogHeader>
          {dayDialogData && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Meal Type:</label>
                <select
                  value={dayDialogData.mealType}
                  onChange={(e) => {
                    const newMealType = e.target.value;
                    setDayDialogData((s) => ({
                      ...s,
                      mealType: newMealType,
                      price: calculatePrice(newMealType, s.mealsCount),
                    }));
                  }}
                  className="px-2 py-1 border rounded-lg text-sm"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Quantity (per meal):</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={dayDialogData.mealsCount}
                  onChange={(e) => {
                    const newMealsCount = Number(e.target.value);
                    setDayDialogData((s) => ({
                      ...s,
                      mealsCount: newMealsCount,
                      price: calculatePrice(s.mealType, newMealsCount),
                    }));
                  }}
                  className="w-24 px-2 py-1 border rounded-lg text-sm"
                />
              </div>

              <p>Price: ₹{dayDialogData.price}</p>
              <p>Status: {dayDialogData.delivered ? "Delivered" : "Not Delivered"}</p>
              {dayDialogData.isFuture && <p className="text-xs text-gray-500">Future day – cannot mark delivered yet</p>}
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <button
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              onClick={() => {
                const updatedUser = { ...localUser };
                updatedUser.mealType = dayDialogData.mealType;
                updatedUser.mealsCount = dayDialogData.mealsCount;
                setLocalUser(updatedUser);
                setDayDialogOpen(false);
                if (onSaved) onSaved();
              }}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => setDayDialogOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
