import React from 'react';
import styles from './Hero.module.scss';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  cta?: {
    text: string;
    action: () => void;
  };
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage, cta }) => {
  // Validate backgroundImage format to prevent injection attacks
  const safeBackgroundImage = backgroundImage && /^https?:\/\/.+/.test(backgroundImage) 
    ? backgroundImage 
    : undefined;

  return (
    <section
      className={styles.hero}
      style={safeBackgroundImage ? { backgroundImage: `url(${safeBackgroundImage})` } : undefined}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {cta && (
            <button className={styles.ctaBtn} onClick={cta.action}>
              {cta.text}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
