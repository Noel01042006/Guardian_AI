import React, { useState } from 'react';
import { Briefcase, TrendingUp, Target, Users, BookOpen, Lightbulb, Award, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CareerGuidanceProps {
  onClose: () => void;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  education: string;
  skills: string[];
  workEnvironment: string;
  icon: string;
}

interface PersonalityResult {
  type: string;
  description: string;
  careers: string[];
  strengths: string[];
}

const CareerGuidance: React.FC<CareerGuidanceProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);

  const careerPaths: CareerPath[] = [
    {
      id: '1',
      title: 'Software Developer',
      description: 'Design and build applications, websites, and software systems.',
      averageSalary: '$70,000 - $120,000',
      growthRate: '22% (Much faster than average)',
      education: 'Bachelor\'s degree in Computer Science or related field',
      skills: ['Programming', 'Problem-solving', 'Teamwork', 'Continuous learning'],
      workEnvironment: 'Office or remote, collaborative team environment',
      icon: '💻'
    },
    {
      id: '2',
      title: 'Healthcare Professional',
      description: 'Provide medical care and support to patients in various settings.',
      averageSalary: '$60,000 - $150,000',
      growthRate: '15% (Much faster than average)',
      education: 'Varies: Certificate to Doctoral degree',
      skills: ['Empathy', 'Communication', 'Attention to detail', 'Physical stamina'],
      workEnvironment: 'Hospitals, clinics, or private practice',
      icon: '🏥'
    },
    {
      id: '3',
      title: 'Environmental Scientist',
      description: 'Study the environment and work to protect human health and nature.',
      averageSalary: '$55,000 - $85,000',
      growthRate: '8% (As fast as average)',
      education: 'Bachelor\'s degree in Environmental Science or related field',
      skills: ['Research', 'Data analysis', 'Critical thinking', 'Communication'],
      workEnvironment: 'Field work, laboratories, and offices',
      icon: '🌱'
    },
    {
      id: '4',
      title: 'Digital Marketing Specialist',
      description: 'Create and manage online marketing campaigns and strategies.',
      averageSalary: '$45,000 - $75,000',
      growthRate: '10% (Faster than average)',
      education: 'Bachelor\'s degree in Marketing, Communications, or related field',
      skills: ['Creativity', 'Analytics', 'Communication', 'Tech-savvy'],
      workEnvironment: 'Office or remote, fast-paced environment',
      icon: '📱'
    },
    {
      id: '5',
      title: 'Teacher/Educator',
      description: 'Educate and inspire students in various subjects and grade levels.',
      averageSalary: '$40,000 - $65,000',
      growthRate: '5% (As fast as average)',
      education: 'Bachelor\'s degree and teaching certification',
      skills: ['Communication', 'Patience', 'Creativity', 'Leadership'],
      workEnvironment: 'Schools, classrooms, educational institutions',
      icon: '📚'
    },
    {
      id: '6',
      title: 'Graphic Designer',
      description: 'Create visual concepts to communicate ideas and inspire audiences.',
      averageSalary: '$35,000 - $60,000',
      growthRate: '3% (As fast as average)',
      education: 'Bachelor\'s degree in Graphic Design or related field',
      skills: ['Creativity', 'Artistic ability', 'Technology skills', 'Communication'],
      workEnvironment: 'Design studios, advertising agencies, or freelance',
      icon: '🎨'
    }
  ];

  const interests = [
    'Technology', 'Healthcare', 'Environment', 'Arts & Design', 'Business',
    'Education', 'Science', 'Sports', 'Music', 'Writing', 'Travel', 'Social Work'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generatePersonalityResult = () => {
    // Simple personality assessment based on selected interests
    const techInterests = selectedInterests.filter(i => ['Technology', 'Science'].includes(i)).length;
    const creativeInterests = selectedInterests.filter(i => ['Arts & Design', 'Music', 'Writing'].includes(i)).length;
    const peopleInterests = selectedInterests.filter(i => ['Healthcare', 'Education', 'Social Work'].includes(i)).length;

    let result: PersonalityResult;

    if (techInterests >= 2) {
      result = {
        type: 'Analytical Thinker',
        description: 'You enjoy solving complex problems and working with data and technology.',
        careers: ['Software Developer', 'Data Scientist', 'Engineer', 'Research Scientist'],
        strengths: ['Logical thinking', 'Problem-solving', 'Attention to detail', 'Technical skills']
      };
    } else if (creativeInterests >= 2) {
      result = {
        type: 'Creative Innovator',
        description: 'You thrive on creativity and expressing ideas through various mediums.',
        careers: ['Graphic Designer', 'Artist', 'Writer', 'Marketing Specialist'],
        strengths: ['Creativity', 'Artistic vision', 'Innovation', 'Communication']
      };
    } else if (peopleInterests >= 2) {
      result = {
        type: 'People-Focused Helper',
        description: 'You are passionate about helping others and making a positive impact.',
        careers: ['Teacher', 'Healthcare Professional', 'Social Worker', 'Counselor'],
        strengths: ['Empathy', 'Communication', 'Leadership', 'Interpersonal skills']
      };
    } else {
      result = {
        type: 'Versatile Explorer',
        description: 'You have diverse interests and enjoy exploring different opportunities.',
        careers: ['Project Manager', 'Consultant', 'Entrepreneur', 'Business Analyst'],
        strengths: ['Adaptability', 'Versatility', 'Curiosity', 'Broad perspective']
      };
    }

    setPersonalityResult(result);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Career Guidance Center</h2>
                <p className="text-indigo-100">Discover your future and plan your career path</p>
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

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'explore', name: 'Explore Careers', icon: MapPin },
              { id: 'assessment', name: 'Career Assessment', icon: Target },
              { id: 'planning', name: 'Career Planning', icon: TrendingUp },
              { id: 'resources', name: 'Resources', icon: BookOpen }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {/* Explore Careers Tab */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Popular Career Paths</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{careerPaths.length} careers to explore</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerPaths.map((career) => (
                  <div key={career.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{career.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{career.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{career.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Average Salary:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">{career.averageSalary}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Job Growth:</span>
                        <span className="text-sm font-medium text-green-600">{career.growthRate}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Education:</span>
                        <p className="text-sm text-gray-800 dark:text-white mt-1">{career.education}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Key Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {career.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Work Environment:</span>
                        <p className="text-sm text-gray-800 dark:text-white mt-1">{career.workEnvironment}</p>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Career Interest Assessment</h3>
                <p className="text-gray-600 dark:text-gray-300">Select your interests to discover careers that match your personality</p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">What interests you most? (Select all that apply)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        selectedInterests.includes(interest)
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={generatePersonalityResult}
                      className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Get My Career Recommendations
                    </button>
                  </div>
                )}
              </div>

              {personalityResult && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Your Personality Type: {personalityResult.type}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{personalityResult.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Recommended Careers:</h5>
                      <ul className="space-y-2">
                        {personalityResult.careers.map((career, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-indigo-500" />
                            <span className="text-gray-700 dark:text-gray-300">{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Your Strengths:</h5>
                      <ul className="space-y-2">
                        {personalityResult.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Career Planning Tab */}
          {activeTab === 'planning' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Career Planning Roadmap</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    phase: 'High School',
                    title: 'Explore & Discover',
                    icon: '🎓',
                    tasks: [
                      'Take career assessments',
                      'Explore different subjects',
                      'Join clubs and activities',
                      'Talk to professionals',
                      'Consider part-time jobs'
                    ]
                  },
                  {
                    phase: 'Post-Secondary',
                    title: 'Prepare & Learn',
                    icon: '📚',
                    tasks: [
                      'Choose education path',
                      'Develop relevant skills',
                      'Gain work experience',
                      'Build a network',
                      'Create a portfolio'
                    ]
                  },
                  {
                    phase: 'Early Career',
                    title: 'Launch & Grow',
                    icon: '🚀',
                    tasks: [
                      'Apply for entry-level positions',
                      'Continue learning',
                      'Seek mentorship',
                      'Set career goals',
                      'Build professional reputation'
                    ]
                  }
                ].map((phase, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{phase.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{phase.phase}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{phase.title}</p>
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Pro Tips for Career Success
                </h4>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                  <li>• Start exploring careers early - it's never too soon to think about your future</li>
                  <li>• Don't be afraid to change direction - many people have multiple careers</li>
                  <li>• Network with professionals in fields that interest you</li>
                  <li>• Gain real-world experience through internships, volunteering, or part-time work</li>
                  <li>• Keep learning and developing new skills throughout your career</li>
                  <li>• Consider the lifestyle and work-life balance you want</li>
                </ul>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Career Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Educational Resources
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Khan Academy Career Courses</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Coursera Professional Certificates</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">LinkedIn Learning Paths</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">edX University Courses</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-500" />
                    Networking & Mentorship
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">LinkedIn Professional Network</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Industry Professional Associations</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Career Mentorship Programs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Alumni Networks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-500" />
                    Job Search Tools
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Indeed Job Search</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Glassdoor Company Reviews</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">LinkedIn Jobs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Company Career Pages</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    Skill Development
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Codecademy (Programming)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Duolingo (Languages)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Adobe Creative Suite (Design)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Toastmasters (Public Speaking)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;