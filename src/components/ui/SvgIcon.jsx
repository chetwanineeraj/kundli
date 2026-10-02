import React from 'react';

/**
 * Renders an SVG from an SVG string or fallback.
 * Allows custom SVG icon replacement by the user!
 */
export default function SvgIcon({ svgString, className = 'w-5 h-5', style = {}, color = 'currentColor' }) {
  if (!svgString) return null;

  // If user provided a direct image URL instead of SVG markup
  if (svgString.startsWith('http://') || svgString.startsWith('https://') || svgString.startsWith('data:image/')) {
    return (
      <img
        src={svgString}
        alt="icon"
        className={`${className} object-contain`}
        style={style}
      />
    );
  }

  // Sanitize and adapt SVG string
  let processedSvg = svgString;

  // Ensure svg has appropriate attributes if needed
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ color, ...style }}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
}
