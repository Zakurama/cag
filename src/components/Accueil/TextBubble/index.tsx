interface TextBubbleProps {
  title: string;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

const TextBubble: React.FC<TextBubbleProps> = ({
  children,
  className,
  title,
  headingLevel = 'h2',
}) => {
  const Heading = headingLevel;

  return (
    <div
      className={`backdrop-blur-xs bg-black/10 dark:bg-white/10 shadow-sm rounded-lg p-6 border border-black/10 dark:border-white/20 ${className}`}
    >
      <Heading className='text-balance text-left text-3xl font-semibold mb-2'>
        {title}
      </Heading>
      {children}
    </div>
  );
};

export default TextBubble;
