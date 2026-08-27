// components/home/CanvasErrorBoundary.jsx
'use client';

import { Component } from 'react';

export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('3D scene failed to render:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Graceful fallback instead of a blank blue screen
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}