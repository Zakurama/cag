import Image from 'next/image';
import TextBubble from '../TextBubble';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface RowProps {
  imageProperties: ImageProps;
  children: React.ReactNode;
  title: string;
  reverse?: boolean;
  className?: string;
}

const Row: React.FC<RowProps> = ({
  imageProperties,
  children,
  title,
  reverse,
  className = '',
}) => {
  return (
    <div
      className={`md:flex mb-8 ${reverse ? 'md:flex-row' : 'md:flex-row-reverse'} ${className}`}
    >
      <TextBubble className='md:mx-0 mx-8 flex-1 md:mb-0 mb-8' title={title}>
        {children}
      </TextBubble>
      <div
        className={`hidden md:block relative w-7/12 h-auto flex-none mx-6 ${reverse ? 'mr-0' : 'ml-0'}`}
      >
        <Image
          src={imageProperties.src}
          alt={imageProperties.alt}
          fill={true}
          className='rounded-4xl'
          objectFit='cover'
        />
      </div>
      <div className='md:hidden relative w-auto flex-none mx-8'>
        {/* mobile-only: fixed width/height image */}
        <Image
          src={imageProperties.src}
          alt={imageProperties.alt}
          width={imageProperties.width}
          height={imageProperties.height}
          className='rounded-4xl w-full h-auto'
        />
      </div>
    </div>
  );
};

export default Row;
