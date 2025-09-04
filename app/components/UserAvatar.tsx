'use client';

interface UserAvatarProps {
  src: string;
  username: string;
  variant?: 'small' | 'medium';
}

export function UserAvatar({ src, username, variant = 'medium' }: UserAvatarProps) {
  const sizeClass = variant === 'small' ? 'w-8 h-8' : 'w-10 h-10';
  
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center overflow-hidden`}>
      {src ? (
        <img 
          src={src} 
          alt={username}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <span className="text-white font-semibold text-sm">
          {username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
