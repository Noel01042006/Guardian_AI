import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  BookOpen,
  MessageCircle,
  Star,
  ChevronRight,
  Search,
  Filter,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

interface ParentingTip {
  id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  readTime: number;
  rating: number;
  tags: string[];
  content: string;
  featured: boolean;
  expert: string;
}

interface ParentingTipsProps {
  onClose: () => void;
}

const ParentingTips: React.FC<ParentingTipsProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedTip, setSelectedTip] = useState<ParentingTip | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen, color: 'gray' },
    { id: 'communication', name: 'Communication', icon: MessageCircle, color: 'blue' },
    { id: 'discipline', name: 'Discipline', icon: Shield, color: 'red' },
    { id: 'development', name: 'Development', icon: TrendingUp, color: 'green' },
    { id: 'digital_safety', name: 'Digital Safety', icon: Shield, color: 'purple' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'orange' },
    { id: 'wellbeing', name: 'Wellbeing', icon: Heart, color: 'pink' },
    { id: 'time_management', name: 'Time Management', icon: Clock, color: 'indigo' }
  ];

  const ageGroups = [
    { id: 'all', name: 'All Ages' },
    { id: 'toddler', name: 'Toddlers (2-4)' },
    { id: 'preschool', name: 'Preschool (4-6)' },
    { id: 'elementary', name: 'Elementary (6-12)' },
    { id: 'teen', name: 'Teenagers (13-18)' },
    { id: 'young_adult', name: 'Young Adults (18+)' }
  ];

  // Mock parenting tips data
  const parentingTips: ParentingTip[] = [
    {
      id: '1',
      title: 'Setting Healthy Screen Time Boundaries',
      description: 'Learn how to establish and maintain appropriate screen time limits for your children.',
      category: 'digital_safety',
      ageGroup: 'elementary',
      difficulty: 'moderate',
      readTime: 8,
      rating: 4.8,
      tags: ['screen time', 'digital wellness', 'boundaries'],
      content: `Setting healthy screen time boundaries is crucial for your child's development and wellbeing. Here's a comprehensive guide to help you establish effective limits:

**Understanding Screen Time Guidelines:**
- Ages 2-5: No more than 1 hour of high-quality programming daily
- Ages 6+: Consistent limits that don't interfere with sleep, physical activity, and other healthy behaviors

**Creating a Family Media Plan:**
1. Designate screen-free zones (bedrooms, dining areas)
2. Establish screen-free times (meals, before bedtime)
3. Choose high-quality, educational content together
4. Model healthy screen habits yourself

**Implementation Strategies:**
- Use visual timers to help children understand time limits
- Provide warnings before screen time ends
- Offer engaging alternatives when screen time is over
- Be consistent with rules and consequences

**Dealing with Resistance:**
- Explain the reasons behind the rules
- Involve children in creating the family media plan
- Acknowledge their feelings while maintaining boundaries
- Celebrate successful adherence to screen time limits

Remember, the goal isn't to eliminate screens entirely but to ensure they enhance rather than replace real-world experiences and relationships.`,
      featured: true,
      expert: 'Dr. Sarah Johnson, Child Development Specialist'
    },
    {
      id: '2',
      title: 'Effective Communication with Teenagers',
      description: 'Strategies for maintaining open dialogue and building trust with your teenage children.',
      category: 'communication',
      ageGroup: 'teen',
      difficulty: 'challenging',
      readTime: 12,
      rating: 4.9,
      tags: ['teenagers', 'communication', 'trust building'],
      content: `Communicating effectively with teenagers requires patience, understanding, and strategic approaches. Here's how to build and maintain strong communication:

**Creating a Safe Communication Environment:**
- Listen without immediately offering solutions
- Avoid judgment and criticism
- Respect their growing independence
- Choose the right time and place for important conversations

**Active Listening Techniques:**
1. Give your full attention (put away devices)
2. Reflect back what you hear
3. Ask open-ended questions
4. Validate their emotions, even if you disagree with their choices

**Building Trust:**
- Keep your promises and commitments
- Admit when you make mistakes
- Respect their privacy while maintaining safety
- Share appropriate stories from your own teenage years

**Navigating Difficult Topics:**
- Approach sensitive subjects with curiosity, not accusation
- Use "I" statements to express your concerns
- Focus on specific behaviors rather than character judgments
- Be prepared to have multiple conversations over time

**When Communication Breaks Down:**
- Take a break and revisit the conversation later
- Consider involving a neutral third party if needed
- Focus on rebuilding the relationship before addressing the issue
- Remember that some distance is normal during adolescence

The teenage years are a time of significant change. Maintaining open communication helps ensure your teen feels supported while developing independence.`,
      featured: true,
      expert: 'Dr. Michael Chen, Adolescent Psychologist'
    },
    {
      id: '3',
      title: 'Positive Discipline Strategies That Work',
      description: 'Evidence-based approaches to discipline that build character and maintain family harmony.',
      category: 'discipline',
      ageGroup: 'elementary',
      difficulty: 'moderate',
      readTime: 10,
      rating: 4.7,
      tags: ['positive discipline', 'behavior management', 'character building'],
      content: `Positive discipline focuses on teaching children appropriate behavior while maintaining their dignity and building their character. Here are proven strategies:

**Core Principles of Positive Discipline:**
- Discipline means "to teach," not "to punish"
- Focus on solutions rather than punishment
- Treat children with respect and dignity
- Help children develop internal motivation for good behavior

**Effective Strategies:**

1. **Natural Consequences:**
   - Allow children to experience the natural results of their choices
   - Ensure consequences are safe and age-appropriate
   - Discuss the connection between choices and outcomes

2. **Logical Consequences:**
   - Create consequences that are directly related to the misbehavior
   - Make consequences reasonable and respectful
   - Focus on future behavior rather than past mistakes

3. **Problem-Solving Together:**
   - Involve children in finding solutions to behavioral issues
   - Brainstorm multiple options together
   - Allow children to choose from acceptable alternatives

4. **Positive Reinforcement:**
   - Acknowledge and praise good behavior immediately
   - Be specific about what behavior you're praising
   - Use encouragement rather than empty praise

**Setting Clear Expectations:**
- Establish family rules together
- Make expectations age-appropriate and clear
- Post visual reminders for younger children
- Regularly review and adjust rules as children grow

**When Discipline Isn't Working:**
- Consider if expectations are developmentally appropriate
- Look for underlying needs or emotions
- Ensure consistency between caregivers
- Seek professional guidance if needed

Remember, the goal of discipline is to help children develop self-control, responsibility, and good judgment that will serve them throughout their lives.`,
      featured: false,
      expert: 'Dr. Lisa Rodriguez, Family Therapist'
    },
    {
      id: '4',
      title: 'Supporting Your Child\'s Emotional Development',
      description: 'Help your child understand and manage their emotions in healthy ways.',
      category: 'wellbeing',
      ageGroup: 'preschool',
      difficulty: 'easy',
      readTime: 6,
      rating: 4.6,
      tags: ['emotional intelligence', 'feelings', 'coping skills'],
      content: `Emotional development is crucial for your child's overall wellbeing and future success. Here's how to support this important growth:

**Understanding Emotional Development:**
- Emotions are normal and healthy
- Children need to learn to identify and express feelings appropriately
- Emotional skills develop gradually over time
- Your response to emotions teaches important lessons

**Teaching Emotion Identification:**
1. **Name the Feeling:**
   - "I see you're feeling frustrated because your tower fell down"
   - Use emotion words throughout daily activities
   - Read books that explore different feelings

2. **Validate Emotions:**
   - "It's okay to feel sad when your friend can't play"
   - Avoid dismissing or minimizing feelings
   - Show that all emotions are acceptable, even if behaviors need limits

**Building Coping Skills:**
- Teach deep breathing exercises
- Create a calm-down space with comfort items
- Practice problem-solving together
- Model healthy emotional expression

**Age-Appropriate Strategies:**

**Ages 2-4:**
- Use simple emotion words
- Offer comfort during big feelings
- Establish predictable routines
- Use visual aids like emotion charts

**Ages 5-8:**
- Discuss more complex emotions
- Teach the connection between thoughts and feelings
- Practice empathy through role-playing
- Introduce basic mindfulness techniques

**Ages 9-12:**
- Explore the intensity of emotions
- Discuss how emotions affect decision-making
- Encourage journaling or artistic expression
- Talk about managing peer relationships

**Supporting During Difficult Times:**
- Maintain routines and consistency
- Provide extra comfort and reassurance
- Be patient with regression in emotional skills
- Seek professional help if concerns persist

Remember, your calm and supportive presence is the most powerful tool for helping your child develop emotional intelligence.`,
      featured: false,
      expert: 'Dr. Amanda Foster, Child Psychologist'
    },
    {
      id: '5',
      title: 'Creating a Homework-Friendly Environment',
      description: 'Set up your home to support your child\'s academic success and reduce homework battles.',
      category: 'education',
      ageGroup: 'elementary',
      difficulty: 'easy',
      readTime: 7,
      rating: 4.5,
      tags: ['homework', 'study habits', 'academic success'],
      content: `Creating the right environment for homework can make a significant difference in your child's academic success and reduce daily stress. Here's how to set up for success:

**Physical Environment Setup:**

1. **Designated Study Space:**
   - Choose a quiet area with minimal distractions
   - Ensure good lighting and comfortable seating
   - Keep supplies organized and easily accessible
   - Make the space inviting and personalized

2. **Essential Supplies:**
   - Pencils, pens, erasers, and rulers
   - Paper, notebooks, and folders
   - Calculator and dictionary (age-appropriate)
   - Timer for time management

**Establishing Routines:**

1. **Consistent Homework Time:**
   - Set a regular time each day for homework
   - Consider your child's energy levels and activities
   - Allow for flexibility when needed
   - Communicate the schedule clearly

2. **Break Structure:**
   - Plan short breaks for longer homework sessions
   - Use breaks for physical movement or snacks
   - Set clear expectations for break duration

**Supporting Without Doing:**

1. **Your Role as Helper:**
   - Be available for questions and guidance
   - Help break large tasks into smaller steps
   - Encourage problem-solving rather than giving answers
   - Celebrate effort and progress

2. **When to Step Back:**
   - Allow children to struggle appropriately
   - Let them experience natural consequences
   - Communicate with teachers about ongoing difficulties
   - Focus on effort rather than perfection

**Managing Homework Challenges:**

1. **Resistance and Procrastination:**
   - Identify underlying causes (difficulty, boredom, overwhelm)
   - Use positive reinforcement for starting tasks
   - Break work into smaller, manageable chunks
   - Consider if the workload is appropriate

2. **Perfectionism:**
   - Emphasize learning over grades
   - Model making mistakes and learning from them
   - Set realistic expectations
   - Praise effort and improvement

**Communication with School:**
- Stay in touch with teachers about homework policies
- Share concerns about homework load or difficulty
- Ask for strategies that work in the classroom
- Coordinate support between home and school

Remember, the goal is to help your child develop independence and good study habits that will serve them throughout their academic career.`,
      featured: true,
      expert: 'Dr. Robert Kim, Educational Consultant'
    }
  ];

  const filteredTips = parentingTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesAgeGroup = selectedAgeGroup === 'all' || tip.ageGroup === selectedAgeGroup;
    
    return matchesSearch && matchesCategory && matchesAgeGroup;
  });

  const featuredTips = parentingTips.filter(tip => tip.featured);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
      moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
      challenging: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    const colorMap = {
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-200',
      red: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-200',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-200',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-200',
      orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-200',
      pink: 'text-pink-600 bg-pink-100 dark:bg-pink-900/20 dark:text-pink-200',
      indigo: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-200'
    };
    return colorMap[categoryData?.color as keyof typeof colorMap] || colorMap.blue;
  };

  if (selectedTip) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
          {/* Article Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
                    {categories.find(c => c.id === selectedTip.category)?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedTip.difficulty)}`}>
                    {selectedTip.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedTip.title}</h2>
                <p className="text-purple-100 mb-3">{selectedTip.description}</p>
                <div className="flex items-center space-x-4 text-sm text-purple-100">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedTip.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    <span>{selectedTip.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{selectedTip.expert}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTip(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {selectedTip.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                } else if (paragraph.includes('**')) {
                  return (
                    <div key={index} className="mb-4">
                      {paragraph.split('**').map((part, partIndex) => 
                        partIndex % 2 === 1 ? (
                          <strong key={partIndex} className="font-semibold text-gray-800 dark:text-white">
                            {part}
                          </strong>
                        ) : (
                          <span key={partIndex}>{part}</span>
                        )
                      )}
                    </div>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Related Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTip.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Parenting Tips & Guidance</h2>
                <p className="text-purple-100">Expert advice for every stage of your parenting journey</p>
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
                  placeholder="Search parenting tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
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
              </div>
            </div>

            {/* Category Quick Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                      selectedCategory === category.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Tips */}
          {searchTerm === '' && selectedCategory === 'all' && selectedAgeGroup === 'all' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Featured Parenting Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTips.map(tip => (
                  <div key={tip.id} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border border-purple-200 dark:border-gray-600 cursor-pointer hover:shadow-lg transition-shadow"
                       onClick={() => setSelectedTip(tip)}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
                        {categories.find(c => c.id === tip.category)?.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{tip.rating}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tip.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{tip.readTime}m read</span>
                      </div>
                      <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400 text-sm font-medium">
                        <span>Read More</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Tips */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                All Parenting Tips ({filteredTips.length})
              </h3>
            </div>

            {filteredTips.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  No tips found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTips.map(tip => (
                  <div key={tip.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                       onClick={() => setSelectedTip(tip)}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
                        {categories.find(c => c.id === tip.category)?.name}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                        {tip.difficulty}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tip.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{tip.readTime}m</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{tip.rating}</span>
                        </div>
                        <span className="capitalize">{tip.ageGroup.replace('_', ' ')}</span>
                      </div>
                      {tip.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tip.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        By {tip.expert}
                      </span>
                      <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400 text-sm font-medium">
                        <span>Read Article</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Daily Parenting Reminders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Listen First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Before offering solutions, take time to truly hear what your child is saying.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Model Behavior</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Children learn more from what they see than what they're told.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Celebrate Small Wins</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acknowledge effort and progress, not just achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentingTips;