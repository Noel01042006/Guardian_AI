import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const { darkMode } = useApp();

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Account Information: When you create an account, we collect your name, email address, and authentication provider information.",
        "Usage Data: We collect information about how you interact with our AI assistants, including conversation logs and feature usage patterns.",
        "Device Information: We may collect device type, operating system, browser information, and IP address for security and optimization purposes.",
        "Voice Data: If you use voice features, we temporarily process audio data to provide speech-to-text functionality. Audio is not stored permanently.",
        "Family Role Information: We collect the role you select (elder, teen, child, parent) to personalize your AI experience."
      ]
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "Personalized AI Assistance: We use your information to provide tailored AI responses based on your role and preferences.",
        "Safety Features: Your data helps us provide scam detection, content filtering, and age-appropriate responses.",
        "Service Improvement: We analyze usage patterns to improve our AI models and user experience.",
        "Communication: We may send you important updates about your account or service changes.",
        "Legal Compliance: We may use your information to comply with legal obligations and protect our users' safety."
      ]
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        "Encryption: All data is encrypted in transit and at rest using industry-standard encryption protocols.",
        "Access Controls: We implement strict access controls and authentication measures to protect your data.",
        "Regular Audits: Our security practices are regularly audited and updated to meet the latest standards.",
        "Data Minimization: We only collect and retain data that is necessary for providing our services.",
        "Secure Infrastructure: Our services are hosted on secure, compliant cloud infrastructure with robust monitoring."
      ]
    },
    {
      icon: Users,
      title: "Data Sharing & Disclosure",
      content: [
        "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
        "Service Providers: We may share data with trusted service providers who help us operate our platform (e.g., cloud hosting, analytics).",
        "Legal Requirements: We may disclose information when required by law or to protect the safety of our users.",
        "Emergency Situations: In cases of imminent danger, we may share relevant information with appropriate authorities.",
        "Business Transfers: In the event of a merger or acquisition, user data may be transferred as part of the business assets."
      ]
    },
    {
      icon: Shield,
      title: "Children's Privacy (COPPA Compliance)",
      content: [
        "Special Protection: We provide enhanced privacy protections for users under 13 years of age.",
        "Parental Consent: We require verifiable parental consent before collecting personal information from children.",
        "Limited Data Collection: We collect only the minimum information necessary to provide safe, educational experiences for children.",
        "No Behavioral Advertising: We do not use children's data for targeted advertising or behavioral profiling.",
        "Parental Rights: Parents can review, modify, or delete their child's information at any time."
      ]
    },
    {
      icon: Globe,
      title: "International Data Transfers",
      content: [
        "Global Service: Our services may involve data transfers to countries outside your residence.",
        "Adequate Protection: We ensure appropriate safeguards are in place for international data transfers.",
        "Privacy Shield: We comply with applicable international privacy frameworks and regulations.",
        "Data Localization: Where required by law, we store data within specific geographic regions.",
        "User Consent: By using our services, you consent to necessary international data transfers."
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              Your privacy is our priority. Learn how we protect and handle your data.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            At Guardian AI, we understand that privacy is fundamental to trust. This Privacy Policy explains how we collect, 
            use, protect, and share your information when you use our AI-powered family safety and assistance platform.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We are committed to transparency and giving you control over your data. This policy applies to all Guardian AI 
            services, including our web application, AI assistants, and any related features.
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

        {/* Your Rights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Privacy Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access & Portability</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Request a copy of your personal data in a portable format.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Correction</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Update or correct inaccurate personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Deletion</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Request deletion of your personal data, subject to legal requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Opt-Out</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Opt out of certain data processing activities.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us About Privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
          </p>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong>Email:</strong> privacy@guardianai.com</p>
            <p><strong>Address:</strong> Guardian AI Privacy Team, 123 Tech Street, San Francisco, CA 94105</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mt-8 transition-colors duration-300">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Policy Updates
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by email 
            or through our service. Your continued use of Guardian AI after such changes constitutes acceptance of the updated policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;