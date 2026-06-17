/**
 * ���������� ��� ����������� ������������� ������
 */

import React from 'react';
import {
  getDisplayValue,
  getMissingMessage,
  isMissingValue,
  MissingContentKey,
} from '@/utils/missingContent';
import { truncateText } from '@/utils';

interface MissingPosterProps {
  className?: string;
}

export const MissingPoster: React.FC<MissingPosterProps> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center bg-dark-800 border border-primary-700/20 text-gray-400 text-xs text-center p-3 ${className}`}
  >
    {getMissingMessage('poster')}
  </div>
);

interface DetailFieldProps {
  label: string;
  value?: string | number | string[];
  missingKey: MissingContentKey;
  truncate?: number;
  className?: string;
}

export const DetailField: React.FC<DetailFieldProps> = ({
  label,
  value,
  missingKey,
  truncate,
  className = '',
}) => {
  const isMissing = isMissingValue(value);
  const displayValue = getDisplayValue(value, missingKey);
  const text = truncate && !isMissing && typeof displayValue === 'string'
    ? truncateText(displayValue, truncate)
    : displayValue;

  return (
    <div className={className}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={isMissing ? 'text-gray-500 italic' : 'text-white'}>{text}</p>
    </div>
  );
};
