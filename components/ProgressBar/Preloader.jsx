import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function Preloader() {
  return (
    <>
        <FontAwesomeIcon className="animate-spin" icon={faCircleNotch} size="6x" />
    </>
  );
}
