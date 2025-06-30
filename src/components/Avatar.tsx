import React from 'react';
import { UserRole } from '../types';
import { User, Heart, Zap, Shield } from 'lucide-react';

interface AvatarProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ role, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const roleConfig = {
    elder: {
      bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
      icon: Shield,
      color: 'text-white'
    },
    teen: {
      bg: 'bg-gradient-to-br from-purple-400 to-blue-500',
      icon: Zap,
      color: 'text-white'
    },
    child: {
      bg: 'bg-gradient-to-br from-pink-400 to-yellow-400',
      icon: Heart,
      color: 'text-white'
    },
    parent: {
      bg: 'bg-gradient-to-br from-teal-400 to-blue-600',
      icon: User,
      color: 'text-white'
    }
  };

  const config = roleConfig[role];
  const IconComponent = config.icon;

  return (
    <div className={`${sizeClasses[size]} ${config.bg} rounded-full flex items-center justify-center shadow-lg ${className}`}>
      <IconComponent className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-12 h-12'} ${config.color}`} />
    </div>
  );
};

export default Avatar;