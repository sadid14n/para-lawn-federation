// components/ui/Button.jsx
import Link from 'next/link';
import { forwardRef } from 'react';

const SIZES = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const VARIANTS = {
  // Solid accent fill — the one and only "primary action" style site-wide
  primary:
    'bg-accent text-white hover:bg-accent-dark shadow-[0_10px_20px_rgba(239,125,32,0.25)] hover:shadow-[0_15px_30px_rgba(239,125,32,0.4)]',
  // Outline — for secondary actions on dark backgrounds
  secondary:
    'bg-transparent border border-white/30 text-white hover:bg-white hover:text-navy',
  // Outline — for secondary actions on light backgrounds
  'secondary-light':
    'bg-transparent border border-navy/20 text-navy hover:bg-navy hover:text-white',
  // Solid navy — reserved for rare cases where accent orange would clash
  // with an already-orange background/context
  dark: 'bg-navy text-white hover:bg-navy-dark',
};

/**
 * Uniform Button — the ONLY button component used across the site.
 *
 * <Button href="/register">Register Athlete</Button>
 * <Button href="/about" variant="secondary">Discover Sport</Button>
 * <Button onClick={fn} variant="primary" size="lg" icon={FiArrowRight}>Submit</Button>
 *
 * Props:
 *  - href          if present, renders a Next.js <Link>; otherwise a <button>
 *  - variant       'primary' | 'secondary' | 'secondary-light' | 'dark'   (default: 'primary')
 *  - size          'sm' | 'md' | 'lg'                                     (default: 'md')
 *  - icon          optional react-icons component, rendered after the label
 *  - iconPosition  'left' | 'right'                                      (default: 'right')
 *  - fullWidth     boolean — stretches to 100% width (useful on mobile stacks)
 *  - className     extra classes, merged on top (use sparingly — the point is NOT needing this)
 */
const Button = forwardRef(function Button(
  {
    href,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    fullWidth = false,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5';
  const classes = [
    base,
    SIZES[size],
    VARIANTS[variant],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          size={size === 'lg' ? 20 : size === 'sm' ? 14 : 18}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon
          size={size === 'lg' ? 20 : size === 'sm' ? 14 : 18}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={ref} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
});

export default Button;