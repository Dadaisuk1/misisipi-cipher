import React from "react";
import { DarkPill, LargePill, CircularPlay } from "../components/Button";
import { Card } from "../components/Card";
import { SearchInput } from "../components/Input";

export const Default: React.FC = () => {
  return (
    <div className="p-8">
      {/* Section Title */}
      <h1 className="text-section-title font-bold mb-8 text-text-base">
        Welcome to Misisipi Cipher
      </h1>

      {/* Search Section */}
      <div className="mb-12">
        <div className="max-w-md mb-6">
          <SearchInput placeholder="Search ciphers..." />
        </div>
      </div>

      {/* Featured Cards Grid */}
      <h2 className="text-feature-heading font-semibold mb-6 text-text-base">
        Featured Ciphers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <Card key={i} elevated className="p-6 hover:shadow-lg">
            <div className="h-32 bg-spotify-surface rounded-spotify-standard mb-4 flex items-center justify-center">
              <span className="text-text-secondary text-body">Cipher {i}</span>
            </div>
            <h3 className="text-body-bold text-text-base mb-2">
              Caesar Cipher #{i}
            </h3>
            <p className="text-caption text-text-secondary mb-4">
              A classic substitution cipher technique used since ancient times.
            </p>
            <div className="flex gap-2">
              <DarkPill>View</DarkPill>
              <LargePill>Encrypt</LargePill>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <section className="mb-12">
        <h2 className="text-feature-heading font-semibold mb-6 text-text-base">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <LargePill>New Cipher</LargePill>
          <DarkPill>Documentation</DarkPill>
          <DarkPill>Settings</DarkPill>
        </div>
      </section>

      {/* Feature Highlight */}
      <Card className="p-8 bg-gradient-to-br from-spotify-surface to-card-dark border border-border-gray">
        <h3 className="text-body-bold text-spotify-green mb-3 flex items-center gap-2">
          <CircularPlay icon="▶" /> Start Encrypting
        </h3>
        <p className="text-body text-text-secondary mb-6">
          Explore powerful encryption algorithms and secure your data with
          advanced cipher techniques.
        </p>
        <LargePill>Get Started</LargePill>
      </Card>
    </div>
  );
};
