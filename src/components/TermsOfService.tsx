import React from 'react';
import { ArrowLeft, FileText, Shield, AlertTriangle, Users, Gavel, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  const { darkMode } = useApp();

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing or using Guardian AI services, you agree to be bound by these Terms of Service and our Privacy Policy.",
        "If you do not agree to these terms, you may not use our services.",
        "These terms apply to all users, including elders, teens, children, and parents who use our platform.",
        "Parents or legal guardians must agree to these terms on behalf of users under 18 years of age.",
        "We reserve the right to modify these terms at any time with notice to users."
      ]
    },
    {
      icon: Users,
      title: "User Accounts and Responsibilities",
      content: [
        "You must provide accurate and complete information when creating an account.",
        "You are responsible for maintaining the security of your account credentials.",
        "Parents are responsible for supervising their children's use of Guardian AI services.",
        "You must not share your account with others or allow unauthorized access.",
        "You agree to notify us immediately of any unauthorized use of your account.",
        "Users must be respectful and appropriate in all interactions with AI assistants."
      ]
    },
    {
      icon: Shield,
      title: "AI Services and Limitations",
      content: [
        "Guardian AI provides AI-powered assistance for educational, safety, and wellbeing purposes.",
        "Our AI assistants are not substitutes for professional medical, legal, or psychological advice.",
        "AI responses are generated based on training data and may not always be accurate or appropriate.",
        "We do not guarantee the accuracy, completeness, or reliability of AI-generated content.",
        "Users should exercise judgment and seek professional help when needed.",
        "Emergency situations require immediate contact with appropriate authorities, not AI assistance."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Uses",
      content: [
        "You may not use Guardian AI for any illegal, harmful, or malicious purposes.",
        "Attempting to manipulate, hack, or reverse-engineer our AI systems is prohibited.",
        "You may not use our services to harass, threaten, or harm others.",
        "Sharing inappropriate content or attempting to bypass safety filters is not allowed.",
        "Commercial use of our services without explicit permission is prohibited.",
        "You may not attempt to extract or scrape data from our platform."
      ]
    },
    {
      icon: Gavel,
      title: "Intellectual Property",
      content: [
        "Guardian AI and its content are protected by copyright, trademark, and other intellectual property laws.",
        "You retain ownership of content you provide, but grant us license to use it for service provision.",
        "You may not copy, modify, distribute, or create derivative works of our platform.",
        "Our AI models, algorithms, and training data are proprietary and confidential.",
        "Any feedback or suggestions you provide may be used by us without compensation.",
        "Third-party content and trademarks remain the property of their respective owners."
      ]
    },
    {
      icon: CreditCard,
      title: "Payment and Billing",
      content: [
        "Some Guardian AI features may require payment of subscription fees.",
        "All fees are charged in advance and are non-refundable except as required by law.",
        "You authorize us to charge your payment method for all applicable fees.",
        "Subscription fees may change with 30 days' notice to subscribers.",
        "You may cancel your subscription at any time through your account settings.",
        "Unpaid fees may result in suspension or termination of your account."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              Please read these terms carefully before using Guardian AI services.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Welcome to Guardian AI
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of Guardian AI's artificial intelligence platform, 
            including our web application, AI assistants, and related services (collectively, the "Service").
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Guardian AI is operated by Guardian AI Inc. ("we," "us," or "our"). By using our Service, you ("you" or "User") 
            agree to these Terms and our Privacy Policy, which is incorporated by reference.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Disclaimers */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-red-800 dark:text-red-200 mb-6">
            Important Disclaimers
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">No Warranty</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                Guardian AI is provided "as is" without warranties of any kind. We do not guarantee uninterrupted 
                or error-free service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Limitation of Liability</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                We shall not be liable for any indirect, incidental, special, or consequential damages arising 
                from your use of our services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Emergency Situations</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                Guardian AI is not designed for emergency situations. In case of emergency, contact local 
                emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Termination
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              You may terminate your account at any time by contacting us or using the account deletion feature 
              in your settings.
            </p>
            <p>
              We may suspend or terminate your account if you violate these Terms or engage in harmful behavior.
            </p>
            <p>
              Upon termination, your right to use Guardian AI ceases immediately, and we may delete your data 
              in accordance with our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Governing Law and Disputes
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard 
              to conflict of law principles.
            </p>
            <p>
              Any disputes arising from these Terms or your use of Guardian AI will be resolved through binding 
              arbitration in San Francisco, California.
            </p>
            <p>
              You waive any right to participate in class action lawsuits or class-wide arbitration.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong>Email:</strong> legal@guardianai.com</p>
            <p><strong>Address:</strong> Guardian AI Inc., 123 Tech Street, San Francisco, CA 94105</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-8 transition-colors duration-300">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Changes to Terms
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            We reserve the right to modify these Terms at any time. We will notify users of material changes 
            via email or through our service. Continued use after changes constitutes acceptance of the new Terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;