import { useState } from 'react';
import { Plus, Trash2, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useApp } from '@/contexts/AppContext';
import { Schedule } from '@/types';

export default function Scheduling() {
  const { schedules, addSchedule, deleteSchedule } = useApp();
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({
    platform: 'linkedin',
    days: [],
    time: '09:00',
    frequency: 'weekly',
    timezone: 'UTC'
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleAddSchedule = () => {
    if (selectedDays.length > 0 && newSchedule.platform && newSchedule.time) {
      const schedule: Schedule = {
        id: Date.now().toString(),
        platform: newSchedule.platform as 'linkedin' | 'twitter',
        days: selectedDays,
        time: newSchedule.time,
        frequency: newSchedule.frequency as Schedule['frequency'],
        timezone: newSchedule.timezone || 'UTC'
      };
      
      addSchedule(schedule);
      setSelectedDays([]);
      setNewSchedule({
        platform: 'linkedin',
        days: [],
        time: '09:00',
        frequency: 'weekly',
        timezone: 'UTC'
      });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Scheduling</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Post Scheduling</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage when your drafts get prepared for posting</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Schedule Setup */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Schedule</CardTitle>
                  <CardDescription>Set up when you want to be reminded to post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Platform Selection */}
                  <div>
                    <Label>Platform</Label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center">
                        <Checkbox
                          checked={newSchedule.platform === 'linkedin'}
                          onCheckedChange={() => setNewSchedule({ ...newSchedule, platform: 'linkedin' })}
                        />
                        <div className="ml-2 flex items-center space-x-2">
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <span>LinkedIn</span>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <Checkbox
                          checked={newSchedule.platform === 'twitter'}
                          onCheckedChange={() => setNewSchedule({ ...newSchedule, platform: 'twitter' })}
                        />
                        <div className="ml-2 flex items-center space-x-2">
                          <Twitter className="w-4 h-4 text-slate-600" />
                          <span>Twitter</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Days Selection */}
                  <div>
                    <Label>Post Days</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {days.map((day) => (
                        <Button
                          key={day}
                          variant={selectedDays.includes(day) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleDayToggle(day)}
                          className="text-xs"
                        >
                          {day.slice(0, 3)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label htmlFor="time">Post Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSchedule.time}
                      onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  {/* Frequency */}
                  <div>
                    <Label>Frequency</Label>
                    <Select value={newSchedule.frequency} onValueChange={(value: any) => setNewSchedule({ ...newSchedule, frequency: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleAddSchedule} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Schedule Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Preview</CardTitle>
                  <CardDescription>Your upcoming posting schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  {schedules.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 dark:text-slate-400">No schedules set up yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {schedules.slice(0, 3).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                        >
                          <div className="flex items-center space-x-3">
                            {schedule.platform === 'linkedin' ? (
                              <Linkedin className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Twitter className="w-5 h-5 text-slate-600" />
                            )}
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {schedule.days.join(', ')}, {schedule.time}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {schedule.platform} • {schedule.frequency}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteSchedule(schedule.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Current Schedules Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Schedules</CardTitle>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">No schedules created yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {schedule.platform === 'linkedin' ? (
                                <Linkedin className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Twitter className="w-4 h-4 text-slate-600" />
                              )}
                              <span className="capitalize">{schedule.platform}</span>
                            </div>
                          </TableCell>
                          <TableCell>{schedule.days.join(', ')}</TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell className="capitalize">{schedule.frequency}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteSchedule(schedule.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
