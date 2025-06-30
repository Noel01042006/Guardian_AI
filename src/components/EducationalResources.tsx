import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Star, 
  Clock, 
  Play,
  Download,
  Search,
  Filter,
  ChevronRight,
  Award,
  Target,
  Lightbulb,
  Globe,
  Calculator,
  Beaker,
  PenTool,
  Music,
  Palette
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'interactive' | 'worksheet' | 'game';
  subject: string;
  ageGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  rating: number;
  thumbnail: string;
  tags: string[];
  featured: boolean;
}

interface EducationalResourcesProps {
  onClose: () => void;
}

const EducationalResources: React.FC<EducationalResourcesProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: BookOpen, color: 'gray' },
    { id: 'mathematics', name: 'Mathematics', icon: Calculator, color: 'blue' },
    { id: 'science', name: 'Science', icon: Beaker, color: 'green' },
    { id: 'english', name: 'English', icon: PenTool, color: 'purple' },
    { id: 'history', name: 'History', icon: Globe, color: 'orange' },
    { id: 'arts', name: 'Arts', icon: Palette, color: 'pink' },
    { id: 'music', name: 'Music', icon: Music, color: 'indigo' }
  ];

  const ageGroups = [
    { id: 'all', name: 'All Ages' },
    { id: 'preschool', name: 'Preschool (3-5)' },
    { id: 'elementary', name: 'Elementary (6-11)' },
    { id: 'middle', name: 'Middle School (12-14)' },
    { id: 'high', name: 'High School (15-18)' }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'article', name: 'Articles' },
    { id: 'video', name: 'Videos' },
    { id: 'interactive', name: 'Interactive' },
    { id: 'worksheet', name: 'Worksheets' },
    { id: 'game', name: 'Games' }
  ];

  // Mock resources data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to Fractions',
      description: 'Learn the basics of fractions with visual examples and interactive exercises.',
      type: 'interactive',
      subject: 'mathematics',
      ageGroup: 'elementary',
      difficulty: 'beginner',
      duration: 25,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['fractions', 'visual learning', 'interactive'],
      featured: true
    },
    {
      id: '2',
      title: 'The Solar System Explorer',
      description: 'Take a virtual journey through our solar system and learn about planets, moons, and space.',
      type: 'video',
      subject: 'science',
      ageGroup: 'elementary',
      difficulty: 'beginner',
      duration: 15,
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=300',
      tags: ['space', 'planets', 'astronomy'],
      featured: true
    },
    {
      id: '3',
      title: 'Creative Writing Workshop',
      description: 'Develop your storytelling skills with guided exercises and writing prompts.',
      type: 'article',
      subject: 'english',
      ageGroup: 'middle',
      difficulty: 'intermediate',
      duration: 30,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['writing', 'creativity', 'storytelling'],
      featured: false
    },
    {
      id: '4',
      title: 'Ancient Civilizations Quiz',
      description: 'Test your knowledge about ancient Egypt, Greece, and Rome with this interactive quiz.',
      type: 'game',
      subject: 'history',
      ageGroup: 'middle',
      difficulty: 'intermediate',
      duration: 20,
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['ancient history', 'quiz', 'civilizations'],
      featured: false
    },
    {
      id: '5',
      title: 'Chemistry Lab Safety',
      description: 'Essential safety guidelines and procedures for conducting chemistry experiments.',
      type: 'video',
      subject: 'science',
      ageGroup: 'high',
      difficulty: 'intermediate',
      duration: 12,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['chemistry', 'safety', 'lab procedures'],
      featured: true
    },
    {
      id: '6',
      title: 'Algebra Problem Solving',
      description: 'Step-by-step guide to solving linear equations and algebraic expressions.',
      type: 'worksheet',
      subject: 'mathematics',
      ageGroup: 'high',
      difficulty: 'advanced',
      duration: 45,
      rating: 4.5,
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['algebra', 'equations', 'problem solving'],
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesAgeGroup = selectedAgeGroup === 'all' || resource.ageGroup === selectedAgeGroup;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesAgeGroup && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration - b.duration;
      case 'title':
        return a.title.localeCompare(b.title);
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play;
      case 'interactive':
        return Target;
      case 'worksheet':
        return Download;
      case 'game':
        return Award;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      article: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
      video: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
      interactive: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
      worksheet: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
      game: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
    };
    return colors[type as keyof typeof colors] || colors.article;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const featuredResources = resources.filter(r => r.featured).slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Educational Resources</h2>
                <p className="text-green-100">Curated learning materials for every age and subject</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
                
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {ageGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {resourceTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Shortest First</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Subject Quick Filters */}
            <div className="flex flex-wrap gap-3">
              {subjects.map(subject => {
                const IconComponent = subject.icon;
                return (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                      selectedSubject === subject.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{subject.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Resources */}
          {searchTerm === '' && selectedSubject === 'all' && selectedAgeGroup === 'all' && selectedType === 'all' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Featured Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredResources.map(resource => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{resource.rating}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{resource.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{resource.duration}m</span>
                        </div>
                        <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                          <span>View</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                All Resources ({filteredResources.length})
              </h3>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <div key={resource.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                            {resource.type}
                          </span>
                        </div>
                        {resource.featured && (
                          <div className="absolute top-3 right-3">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{resource.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{resource.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{resource.duration}m</span>
                            <span>•</span>
                            <span className="capitalize">{resource.ageGroup}</span>
                          </div>
                          <button className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm">
                            <TypeIcon className="w-4 h-4" />
                            <span>Open</span>
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Learning Tips */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Learning Tips for Parents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Creating a Learning Environment</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Set up a dedicated, quiet study space</li>
                  <li>• Minimize distractions during learning time</li>
                  <li>• Ensure good lighting and comfortable seating</li>
                  <li>• Keep learning materials organized and accessible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Supporting Your Child</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Show interest in what they're learning</li>
                  <li>• Celebrate small achievements and progress</li>
                  <li>• Encourage questions and curiosity</li>
                  <li>• Be patient and supportive during challenges</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;