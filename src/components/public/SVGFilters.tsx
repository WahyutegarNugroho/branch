export default function SVGFilters() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* SVG Brutalism: 2px Solid Border + 4x4 Offset Shadow */}
        <filter id="svg-brutalism" x="-20%" y="-20%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="BORDER_ALPHA" />
          <feFlood floodColor="rgba(255,255,255,0.8)" result="BORDER_COLOR" />
          <feComposite in="BORDER_COLOR" in2="BORDER_ALPHA" operator="in" result="OUTLINE" />
          
          <feOffset in="BORDER_ALPHA" dx="4" dy="4" result="SHADOW_ALPHA" />
          <feFlood floodColor="rgba(255,255,255,0.8)" result="SHADOW_COLOR" />
          <feComposite in="SHADOW_COLOR" in2="SHADOW_ALPHA" operator="in" result="SHADOW" />

          <feMerge>
            <feMergeNode in="SHADOW" />
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* SVG Claymorphism: Inner Highlights & Shadows + Outer Shadow */}
        <filter id="svg-claymorphism" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset in="SourceAlpha" dx="6" dy="6" result="OUTER_OFFSET" />
          <feGaussianBlur in="OUTER_OFFSET" stdDeviation="5" result="OUTER_BLUR" />
          <feFlood floodColor="rgba(0,0,0,0.4)" result="OUTER_COLOR" />
          <feComposite in="OUTER_COLOR" in2="OUTER_BLUR" operator="in" result="OUTER_SHADOW" />

          <feOffset in="SourceAlpha" dx="4" dy="4" result="INSET_OFFSET1" />
          <feComposite in="SourceAlpha" in2="INSET_OFFSET1" operator="out" result="INVERSE1" />
          <feFlood floodColor="rgba(255,255,255,0.3)" result="INSET_COLOR1" />
          <feComposite in="INSET_COLOR1" in2="INVERSE1" operator="in" result="INSET_LIGHT" />

          <feOffset in="SourceAlpha" dx="-4" dy="-4" result="INSET_OFFSET2" />
          <feComposite in="SourceAlpha" in2="INSET_OFFSET2" operator="out" result="INVERSE2" />
          <feFlood floodColor="rgba(0,0,0,0.5)" result="INSET_COLOR2" />
          <feComposite in="INSET_COLOR2" in2="INVERSE2" operator="in" result="INSET_DARK" />

          <feMerge>
            <feMergeNode in="OUTER_SHADOW" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="INSET_LIGHT" />
            <feMergeNode in="INSET_DARK" />
          </feMerge>
        </filter>

        {/* SVG Neumorphism: Dual Outer Shadows + Dual Inner Highlights */}
        <filter id="svg-neumorphism" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset in="SourceAlpha" dx="3" dy="3" result="OUTER_OFFSET1" />
          <feGaussianBlur in="OUTER_OFFSET1" stdDeviation="2.5" result="OUTER_BLUR1" />
          <feFlood floodColor="rgba(0,0,0,0.4)" result="OUTER_COLOR1" />
          <feComposite in="OUTER_COLOR1" in2="OUTER_BLUR1" operator="in" result="OUTER_DARK" />

          <feOffset in="SourceAlpha" dx="-2" dy="-2" result="OUTER_OFFSET2" />
          <feGaussianBlur in="OUTER_OFFSET2" stdDeviation="2" result="OUTER_BLUR2" />
          <feFlood floodColor="rgba(255,255,255,0.2)" result="OUTER_COLOR2" />
          <feComposite in="OUTER_COLOR2" in2="OUTER_BLUR2" operator="in" result="OUTER_LIGHT" />

          <feOffset in="SourceAlpha" dx="2" dy="2" result="INSET_OFFSET1" />
          <feComposite in="SourceAlpha" in2="INSET_OFFSET1" operator="out" result="INVERSE1" />
          <feFlood floodColor="rgba(255,255,255,0.2)" result="INSET_COLOR1" />
          <feComposite in="INSET_COLOR1" in2="INVERSE1" operator="in" result="INSET_LIGHT" />

          <feOffset in="SourceAlpha" dx="-3" dy="-3" result="INSET_OFFSET2" />
          <feComposite in="SourceAlpha" in2="INSET_OFFSET2" operator="out" result="INVERSE2" />
          <feFlood floodColor="rgba(0,0,0,0.5)" result="INSET_COLOR2" />
          <feComposite in="INSET_COLOR2" in2="INVERSE2" operator="in" result="INSET_DARK" />

          <feMerge>
            <feMergeNode in="OUTER_DARK" />
            <feMergeNode in="OUTER_LIGHT" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="INSET_LIGHT" />
            <feMergeNode in="INSET_DARK" />
          </feMerge>
        </filter>

        {/* SVG Glassmorphism: Outer Shadow + 1px Top/Left highlight border */}
        <filter id="svg-glassmorphism" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset in="SourceAlpha" dx="0" dy="4" result="OUTER_OFFSET" />
          <feGaussianBlur in="OUTER_OFFSET" stdDeviation="7.5" result="OUTER_BLUR" />
          <feFlood floodColor="rgba(0,0,0,0.2)" result="OUTER_COLOR" />
          <feComposite in="OUTER_COLOR" in2="OUTER_BLUR" operator="in" result="OUTER_SHADOW" />

          {/* Simulate top-left 1px border */}
          <feOffset in="SourceAlpha" dx="1" dy="1" result="INSET_OFFSET" />
          <feComposite in="SourceAlpha" in2="INSET_OFFSET" operator="out" result="INVERSE" />
          <feFlood floodColor="rgba(255,255,255,0.2)" result="INSET_COLOR" />
          <feComposite in="INSET_COLOR" in2="INVERSE" operator="in" result="BORDER_TOPLEFT" />

          <feMerge>
            <feMergeNode in="OUTER_SHADOW" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="BORDER_TOPLEFT" />
          </feMerge>
        </filter>

        {/* SVG Outline: 1px Solid Border */}
        <filter id="svg-outline" x="-20%" y="-20%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="BORDER_ALPHA" />
          <feFlood floodColor="rgba(255,255,255,0.2)" result="BORDER_COLOR" />
          <feComposite in="BORDER_COLOR" in2="BORDER_ALPHA" operator="in" result="OUTLINE" />
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* SVG Shadow: Outer Drop Shadow */}
        <filter id="svg-shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset in="SourceAlpha" dx="0" dy="8" result="OUTER_OFFSET" />
          <feGaussianBlur in="OUTER_OFFSET" stdDeviation="7.5" result="OUTER_BLUR" />
          <feFlood floodColor="rgba(0,0,0,0.3)" result="OUTER_COLOR" />
          <feComposite in="OUTER_COLOR" in2="OUTER_BLUR" operator="in" result="OUTER_SHADOW" />

          {/* Tiny 1px outline for clarity */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="BORDER_ALPHA" />
          <feFlood floodColor="rgba(255,255,255,0.15)" result="BORDER_COLOR" />
          <feComposite in="BORDER_COLOR" in2="BORDER_ALPHA" operator="in" result="OUTLINE" />

          <feMerge>
            <feMergeNode in="OUTER_SHADOW" />
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

      </defs>
    </svg>
  )
}
