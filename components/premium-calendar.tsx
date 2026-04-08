'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles, X } from 'lucide-react';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Note {
  heading: string;
  description: string;
  date: string;
}

interface Festival {
  date: number;
  name: string;
  month: number;
}

const festivalsList: Festival[] = [
  // January
  { date: 1, name: 'New Year\'s Day', month: 0 },
  { date: 14, name: 'Makar Sankranti', month: 0 },
  { date: 26, name: 'Republic Day (IN)', month: 0 },
  
  // February
  { date: 13, name: 'Maha Shivaratri', month: 1 },
  { date: 14, name: 'Valentine\'s Day', month: 1 },
  
  // March
  { date: 4, name: 'Holi', month: 2 },
  { date: 8, name: 'International Women\'s Day', month: 2 },
  { date: 17, name: 'St. Patrick\'s Day', month: 2 },
  { date: 20, name: 'Eid al-Fitr', month: 2 },
  
  // April
  { date: 3, name: 'Good Friday', month: 3 },
  { date: 5, name: 'Easter Sunday', month: 3 },
  { date: 14, name: 'Ambedkar Jayanti / Baisakhi', month: 3 },
  { date: 22, name: 'Earth Day', month: 3 },
  
  // May
  { date: 1, name: 'Labour Day', month: 4 },
  { date: 10, name: 'Mother\'s Day', month: 4 },
  
  // June
  { date: 21, name: 'International Yoga Day', month: 5 },
  
  // July
  { date: 4, name: 'US Independence Day', month: 6 },
  
  // August
  { date: 15, name: 'Independence Day (IN)', month: 7 },
  { date: 28, name: 'Raksha Bandhan', month: 7 },
  
  // September
  { date: 3, name: 'Krishna Janmashtami', month: 8 },
  { date: 14, name: 'Ganesh Chaturthi', month: 8 },
  
  // October
  { date: 2, name: 'Gandhi Jayanti', month: 9 },
  { date: 19, name: 'Dussehra', month: 9 },
  { date: 31, name: 'Halloween', month: 9 },
  
  // November
  { date: 8, name: 'Diwali', month: 10 },
  { date: 26, name: 'Thanksgiving', month: 10 },
  
  // December
  { date: 25, name: 'Christmas Day', month: 11 },
  { date: 31, name: 'New Year\'s Eve', month: 11 },
];

const monthImages = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop', // January
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=450&fit=crop', // February
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop', // March
  'https://images.unsplash.com/photo-1774331510646-a1781c4a9713?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // April
  'https://images.unsplash.com/photo-1774249904451-ba46beafcb5b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // May
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=450&fit=crop', // June
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop', // July
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=450&fit=crop', // August
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=450&fit=crop', // September
  'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&h=450&fit=crop', // October
  'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&h=450&fit=crop', // November
  'https://images.unsplash.com/photo-1773318427480-1058e1059f99?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // December
];

export default function PremiumCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3)); // Default to April 2026
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: new Date(2026, 3, 12), end: new Date(2026, 3, 16) });
  const [notes, setNotes] = useState<Note[]>([
    { heading: 'Team offsite planning', description: 'Review logistics and venue for quarterly team offsite.', date: '2026-04-10' },
    { heading: 'Q4 budget review', description: 'Prepare financial models and projections for board meeting.', date: '2026-04-18' },
    { heading: 'Client presentation', description: 'Finalize slide deck and practice product demo.', date: '2026-04-22' }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('calendar_notes', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);
  const [newNote, setNewNote] = useState<Note>({ heading: '', description: '', date: '' });

  const today = new Date();
  const monthDays = getDaysInMonth(currentDate);
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function isDateInRange(day: number): boolean {
    if (!selectedRange.start || !selectedRange.end) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate >= selectedRange.start && checkDate <= selectedRange.end;
  }

  function isRangeStart(day: number): boolean {
    if (!selectedRange.start) return false;
    return day === selectedRange.start.getDate() && 
      currentDate.getMonth() === selectedRange.start.getMonth() &&
      currentDate.getFullYear() === selectedRange.start.getFullYear();
  }

  function isRangeEnd(day: number): boolean {
    if (!selectedRange.end) return false;
    return day === selectedRange.end.getDate() && 
      currentDate.getMonth() === selectedRange.end.getMonth() &&
      currentDate.getFullYear() === selectedRange.end.getFullYear();
  }

  function isToday(day: number): boolean {
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  }

  function getFestivalForDate(day: number): Festival | undefined {
    return festivalsList.find(
      festival => festival.date === day && festival.month === currentDate.getMonth()
    );
  }

  function handleDateClick(day: number) {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: clickedDate, end: null });
    } else if (clickedDate < selectedRange.start) {
      setSelectedRange({ start: clickedDate, end: selectedRange.start });
    } else {
      setSelectedRange({ ...selectedRange, end: clickedDate });
    }
  }

  function prevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  }

  function handleAddNote() {
    if (newNote.heading.trim() && newNote.date) {
      setNotes([...notes, newNote]);
      setNewNote({ heading: '', description: '', date: '' });
      setIsNoteModalOpen(false);
    } else {
      alert("Please fill in the heading and date");
    }
  }

  function handleRemoveNote(indexToRemove: number) {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
  }

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= monthDays; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-40 to-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Hero Image Carousel */}
          <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-lg overflow-hidden relative group">
            <img 
              src={monthImages[currentDate.getMonth()]}
              alt={`${monthName} - ${festivalsList.filter(f => f.month === currentDate.getMonth()).map(f => f.name).join(', ')}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <h2 className="text-2xl font-light text-neutral-900 tracking-wide">{monthName}</h2>
              <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const festival = day ? getFestivalForDate(day) : undefined;
                return (
                  <div key={index} className="aspect-square relative">
                    {day ? (
                      <>
                        <button
                          onClick={() => handleDateClick(day)}
                          className={`
                            w-full h-full rounded-lg text-sm font-medium transition-all
                            ${isRangeStart(day) 
                              ? 'bg-amber-600 text-white rounded-l-lg rounded-r-none shadow-md' 
                              : isRangeEnd(day)
                              ? 'bg-amber-600 text-white rounded-r-lg rounded-l-none shadow-md'
                              : isDateInRange(day)
                              ? 'bg-amber-100/60 text-neutral-900'
                              : 'text-neutral-600 hover:bg-neutral-100'
                            }
                            ${isToday(day) ? 'ring-2 ring-amber-500 font-semibold' : ''}
                          `}
                        >
                          {day}
                        </button>
                        {festival && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" title={festival.name} />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-light text-neutral-900 tracking-wide">Notes for {monthName}</h3>
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-neutral-100 last:border-0 group">
                  <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{note.heading}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{note.date}</p>
                    <p className="text-sm text-neutral-700 mt-1">{note.description}</p>
                  </div>
                  <button onClick={() => handleRemoveNote(index)} className="p-1 min-w-[24px] min-h-[24px] text-neutral-400 hover:text-red-500 transition-colors md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setIsNoteModalOpen(true)} className="w-full flex items-center justify-center gap-2 mt-4 py-3 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Note</span>
            </button>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-lg overflow-hidden relative group">
              <img 
                src={monthImages[currentDate.getMonth()]}
                alt={`${monthName} - ${festivalsList.filter(f => f.month === currentDate.getMonth()).map(f => f.name).join(', ')}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-light text-neutral-900 tracking-wide">Notes for {monthName}</h3>
              <div className="space-y-3">
                {notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-neutral-100 last:border-0 group">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{note.heading}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{note.date}</p>
                      <p className="text-sm text-neutral-700 mt-1">{note.description}</p>
                    </div>
                    <button onClick={() => handleRemoveNote(index)} className="p-1 min-w-[24px] min-h-[24px] text-neutral-400 hover:text-red-500 transition-colors md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsNoteModalOpen(true)} className="w-full flex items-center justify-center gap-2 mt-4 py-3 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Note</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <h2 className="text-xl font-light text-neutral-900 tracking-wide">{monthName}</h2>
              <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const festival = day ? getFestivalForDate(day) : undefined;
                return (
                  <div key={index} className="aspect-square relative">
                    {day ? (
                      <>
                        <button
                          onClick={() => handleDateClick(day)}
                          className={`
                            w-full h-full rounded text-xs font-medium transition-all
                            ${isRangeStart(day) 
                              ? 'bg-amber-600 text-white rounded-l rounded-r-none shadow-md' 
                              : isRangeEnd(day)
                              ? 'bg-amber-600 text-white rounded-r rounded-l-none shadow-md'
                              : isDateInRange(day)
                              ? 'bg-amber-100/60 text-neutral-900'
                              : 'text-neutral-600 hover:bg-neutral-100'
                            }
                            ${isToday(day) ? 'ring-2 ring-amber-500 font-semibold' : ''}
                          `}
                        >
                          {day}
                        </button>
                        {festival && (
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" title={festival.name} />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-6 items-start">
          {/* Left Pane (40%) */}
          <div className="col-span-2 space-y-6">
            {/* Hero Image Carousel */}
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative group">
              <img 
                src={monthImages[currentDate.getMonth()]}
                alt={`${monthName} - ${festivalsList.filter(f => f.month === currentDate.getMonth()).map(f => f.name).join(', ')}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white p-4 text-sm font-medium">
                  <p className="text-xs opacity-75 mb-1">Festivals this month</p>
                  <p className="line-clamp-2">{festivalsList.filter(f => f.month === currentDate.getMonth()).map(f => f.name).join(', ') || 'No festivals this month'}</p>
                </div>
              </div>
            </div>

            {/* Notes Panel */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div>
                <h3 className="text-lg font-light text-neutral-900 tracking-wide mb-1">
                  Notes for {monthName}
                </h3>
                <div className="w-12 h-1 bg-amber-600 rounded-full"></div>
              </div>

              <div className="space-y-4">
                {notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 group">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{note.heading}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{note.date}</p>
                      <p className="text-sm text-neutral-700 mt-1">{note.description}</p>
                    </div>
                    <button onClick={() => handleRemoveNote(index)} className="p-1 min-w-[24px] min-h-[24px] text-neutral-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={() => setIsNoteModalOpen(true)} className="w-full flex items-center justify-center gap-3 py-3 text-amber-600 hover:bg-amber-50 rounded-xl transition-all font-medium text-sm">
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          </div>

          {/* Right Pane (60%) - Calendar */}
          <div className="col-span-3 bg-white rounded-2xl shadow-lg p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-neutral-600" />
              </button>
              <h2 className="text-4xl font-light text-neutral-900 tracking-wide">
                {monthName}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-neutral-600" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-3">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div 
                  key={day} 
                  className="text-center text-sm font-medium text-neutral-500 pb-3 border-b border-neutral-100"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">
              {calendarDays.map((day, index) => {
                const festival = day ? getFestivalForDate(day) : undefined;
                return (
                  <div key={index} className="aspect-square relative group">
                    {day ? (
                      <>
                        <button
                          onClick={() => handleDateClick(day)}
                          className={`
                            w-full h-full rounded-2xl font-medium text-base transition-all duration-200 relative
                            ${isRangeStart(day) 
                              ? 'bg-amber-600 text-white rounded-r-none shadow-lg hover:shadow-xl' 
                              : isRangeEnd(day)
                              ? 'bg-amber-600 text-white rounded-l-none shadow-lg hover:shadow-xl'
                              : isDateInRange(day)
                              ? 'bg-amber-100/70 text-neutral-900 hover:bg-amber-100/90'
                              : 'text-neutral-600 hover:bg-neutral-100'
                            }
                            ${isToday(day) ? 'ring-2 ring-amber-500 font-bold' : ''}
                          `}
                        >
                          {day}
                        </button>
                        {festival && (
                          <>
                            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                              <div className="bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                <Sparkles className="inline w-3 h-3 mr-1 mb-0.5" />
                                {festival.name}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-neutral-900">Add New Note</h3>
              <button 
                onClick={() => {
                  setIsNoteModalOpen(false);
                  setNewNote({ heading: '', description: '', date: '' });
                }} 
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Heading</label>
                <input 
                  type="text" 
                  value={newNote.heading}
                  onChange={(e) => setNewNote({...newNote, heading: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-neutral-900"
                  placeholder="e.g. Meeting with team"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                <input 
                  type="date"
                  value={newNote.date}
                  onChange={(e) => setNewNote({...newNote, date: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-neutral-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description <span className="text-neutral-400 font-normal">(Optional)</span></label>
                <textarea 
                  value={newNote.description}
                  onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-neutral-900 min-h-[100px] resize-y"
                  placeholder="Note details..."
                />
              </div>
              <button 
                onClick={handleAddNote}
                className="w-full py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors mt-2"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
