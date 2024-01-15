import React, { useState } from 'react';
import { useOutlet } from 'react-router-dom';

// allows for animated transitions between routes when using react-router-dom 'Outlet' component
const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return outlet;
};

AnimatedOutlet.displayName = 'AnimatedOutlet';

export default AnimatedOutlet;
