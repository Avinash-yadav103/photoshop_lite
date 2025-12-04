import React from 'react';

// SVG Icons based on the reference design - circular icons with clean lines
export const Icons = {
  // Brightness - Sun icon
  Brightness: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
      <path d="M12 2V4M12 20V22M4 12H2M22 12H20M6.34 6.34L4.93 4.93M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Temperature - Thermometer icon
  Temperature: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
      <path d="M12 3V5M12 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 4.5C10 3.67 10.67 3 11.5 3H12.5C13.33 3 14 3.67 14 4.5V14.5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),

  // Contrast - Half circle icon
  Contrast: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 3V21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3Z" fill={active ? color : color} fillOpacity={active ? 1 : 0.3} />
    </svg>
  ),

  // Exposure - Up/Down arrows icon
  Exposure: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={active ? '#00b4d8' : color} strokeWidth="1.5" />
      <path d="M12 7L15 10H9L12 7Z" fill={color} />
      <path d="M12 17L9 14H15L12 17Z" fill={color} />
    </svg>
  ),

  // Saturation - Droplet icon
  Saturation: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={active ? '#00b4d8' : color} strokeWidth="1.5" />
      <path d="M12 6C12 6 8 10 8 13C8 15.209 9.791 17 12 17C14.209 17 16 15.209 16 13C16 10 12 6 12 6Z" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
    </svg>
  ),

  // Fade - Circle with dot
  Fade: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={active ? '#00b4d8' : color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  ),

  // Vibrance - Rainbow lines
  Vibrance: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M8 16L8 8" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 16L10 10" stroke="#ffaa00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16L12 8" stroke="#44ff44" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 16L14 10" stroke="#4444ff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16L16 8" stroke="#aa44ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Highlight - Diamond
  Highlight: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={active ? '#00b4d8' : color} strokeWidth="1.5" />
      <path d="M12 6L18 12L12 18L6 12L12 6Z" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
    </svg>
  ),

  // Shadow - Half circle split
  Shadow: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={active ? '#00b4d8' : color} strokeWidth="1.5" />
      <path d="M12 3C16.971 3 21 7.029 21 12H12V3Z" fill={color} />
      <path d="M12 21C7.029 21 3 16.971 3 12H12V21Z" fill={color} fillOpacity="0.3" />
    </svg>
  ),

  // Vignette - Triangle
  Vignette: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 7L17 16H7L12 7Z" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
    </svg>
  ),

  // Grain - Square
  Grain: ({ size = 24, color = 'currentColor', active = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <rect x="8" y="8" width="8" height="8" stroke={color} strokeWidth="1.5" fill={active ? color : 'none'} />
    </svg>
  ),

  // Upload/Cloud
  Upload: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // History
  History: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.05 11C3.27 6.06 7.22 2.13 12.17 2C17.47 1.86 21.86 6.14 22 11.44C22.14 16.74 17.86 21.13 12.56 21.27C9.29 21.36 6.39 19.87 4.55 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15L4.5 17.5L7 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Settings/Gear
  Settings: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.07 3.93L18.66 5.34M5.34 18.66L3.93 20.07M20.07 20.07L18.66 18.66M5.34 5.34L3.93 3.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Layers
  Layers: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Select/Cursor
  Select: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Text
  Text: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6V4H20V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 20H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // File/Document
  File: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Crop
  Crop: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2V19H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 22V5H1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Fullscreen
  Fullscreen: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Play
  Play: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L5 21V3Z" fill={color} />
    </svg>
  ),

  // Pause
  Pause: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="4" height="16" fill={color} />
      <rect x="14" y="4" width="4" height="16" fill={color} />
    </svg>
  ),

  // Skip Forward
  SkipForward: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4L15 12L5 20V4Z" fill={color} />
      <rect x="17" y="4" width="2" height="16" fill={color} />
    </svg>
  ),

  // Skip Back
  SkipBack: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 20L9 12L19 4V20Z" fill={color} />
      <rect x="5" y="4" width="2" height="16" fill={color} />
    </svg>
  ),

  // Video/Film
  Video: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M7 4V20M17 4V20M2 9H7M17 9H22M2 15H7M17 15H22" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  // Trim/Scissors
  Trim: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Speed
  Speed: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L17 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 2L22 7L17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Download
  Download: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3V15M12 15L8 11M12 15L16 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Reset
  Reset: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C8.51 3 5.49 5.06 3.94 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3V8H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Trash/Delete
  Trash: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H5H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Duplicate/Copy
  Duplicate: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  // Edge Detection
  EdgeDetection: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 12H21M12 3V21" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  ),

  // Face Detection
  FaceDetection: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1.5" fill={color} />
      <circle cx="15" cy="10" r="1.5" fill={color} />
      <path d="M8 15C8.5 16.5 10 17.5 12 17.5C14 17.5 15.5 16.5 16 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Blur
  Blur: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2" fill={color} />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  ),

  // Filter
  Filter: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Close/X
  Close: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Check/Checkmark
  Check: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Image
  Image: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
      <path d="M21 15L16 10L5 21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Moon (Dark mode)
  Moon: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Sun (Light mode)
  Sun: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Morphology
  Morphology: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
      <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
      <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  // Frequency
  Frequency: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12H5L7 4L10 20L13 8L16 16L18 12H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // ML/AI
  ML: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="4" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="20" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="4" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M12 6V9M12 15V18M6 12H9M15 12H18" stroke={color} strokeWidth="1.5" />
    </svg>
  )
};

export default Icons;