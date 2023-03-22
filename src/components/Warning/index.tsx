import React, { useCallback, useState } from 'react'

import { Question } from 'components/Icons'

const Warning = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      window.open('https://youtu.be/-5wpm-gesOY', '_blank')
    }
  }, [isOpen])

  return (
    <div
      className={`${
        isOpen ? 'text-left' : 'text-center'
      } max-w-7xl p-3 bg-white duration-300 transition-colors ease-linear dark:bg-darkSecondary mt-10 rounded-lg shadow-xl text-primary dark:text-darkPrimary`}
    >
      {!isOpen && (
        <h6 className="text-base inline-block">
          Use this with caution{' '}
          <span onClick={toggleOpen}>
            <Question className="w-4 align-top cursor-pointer" />
          </span>
        </h6>
      )}
      {isOpen && (
        <div className="mt-2">
          Ok ... it's not like we're considering all the previous issues{' '}
          <a
            className="underline"
            href="https://youtu.be/-5wpm-gesOY"
            target="_blank"
            rel="noopener noreferrer"
          >
            that video
          </a>{' '}
          mentions, but the real issue today for this little project are DST.
          <br />
          <br />
          Every country has its own DST as we can see{' '}
          <a
            className="underline"
            href="https://www.entrepreneur.com/article/423655"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{' '}
          for Mexican government, or&nbsp;
          <a
            className="underline"
            href="https://abcnews.go.com/International/debate-daylight-saving-time-drags-europe/story?id=80925773"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{' '}
          for Europe.
          <br />
          <br />
          So since it's really uncertain how DST will affect the time, I've decided to use only
          whatever&nbsp;
          <a
            className="underline"
            href="https://github.com/drochag/worldtime/blob/master/src/utils/getWithDifferences.ts#L11"
            target="_blank"
            rel="noopener noreferrer"
          >
            rawOffset
          </a>{' '}
          the API returns, which most of the time should be ok.
        </div>
      )}
    </div>
  )
}

export default Warning
