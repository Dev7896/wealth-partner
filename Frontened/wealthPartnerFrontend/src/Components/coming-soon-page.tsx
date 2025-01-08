'use client'

import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { ClockIcon } from '@heroicons/react/24/outline'
import React from 'react' 

export default function ComingSoonPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1
        if (newProgress === 100) {
          clearInterval(timer)
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Coming Soon
        </h1>
        <div className="text-xl md:text-2xl text-gray-600 h-20">
          <TypeAnimation
            sequence={[
              'We\'re working hard to bring you something amazing.',
              1000,
              'Get ready for an exciting new experience.',
              1000,
              'Stay tuned for our big reveal!',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <ClockIcon className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold inline-block text-blue-600">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          We're putting the finishing touches on something special. 
          Check back soon for updates!
        </p>
      </div>
    </div>
  )
}

