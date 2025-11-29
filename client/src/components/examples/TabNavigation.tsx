import { useState } from 'react';
import TabNavigation from '../TabNavigation';

export default function TabNavigationExample() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'grades' | 'syllabus'>('students');

  return <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />;
}
