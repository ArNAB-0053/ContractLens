import { FileText, Upload, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const UploadCard = ({ type, file, setFile }) => {
  const colors = {
    1: { accent: 'bg-blue-500', light: 'bg-blue-50' },
    2: { accent: 'bg-purple-500', light: 'bg-purple-50' }
  };

  return (
    <div className="relative w-full pt-8">
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm text-white font-medium z-10"
        style={{ 
          background: 'linear-gradient(45deg, rgb(59 130 246), rgb(147 51 234))',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
        Contract {type}
      </div>
      <div className={cn(
        `rounded-xl p-6 transition-all duration-300 
         border border-gray-200`, 
         file ? 'bg-green-50' : `${colors[type].light}`
         )}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-3 ${colors[type].light} rounded-full`}>
            {file ? (
              <Sparkles className={`w-6 h-6 ${type === 1 ? 'text-blue-500' : 'text-purple-500'}`} />
            ) : (
              <FileText className={`w-6 h-6 ${type === 1 ? 'text-blue-500' : 'text-purple-500'}`} />
            )}
          </div>
          
          <div className="text-center w-full">
            <p className="text-sm text-gray-600 truncate max-w-[200px] mx-auto">
              {file ? file.name : "No file selected"}
            </p>
          </div>

          <div className="relative w-full cursor-pointer">
            <Button type="button" 
              className={`
                w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2
                ${file ? 'bg-green-500 hover:bg-green-600' : `${colors[type].accent}`}
                text-white transition-all duration-300 text-sm cursor-pointer
              `}>
              <Upload className="w-4 h-4" />
              <span>{file ? 'Change' : 'Select File'}</span>
            </Button> 
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;