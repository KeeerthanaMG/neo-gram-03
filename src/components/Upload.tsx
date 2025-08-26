import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, Image, Camera, X, Filter, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const filters = [
  { name: 'Original', class: '' },
  { name: 'Vintage', class: 'sepia-[0.8] contrast-[1.2]' },
  { name: 'Noir', class: 'grayscale contrast-[1.3]' },
  { name: 'Warm', class: 'hue-rotate-15 saturate-[1.2] brightness-[1.1]' },
  { name: 'Cool', class: 'hue-rotate-180 saturate-[1.1]' },
  { name: 'Vibrant', class: 'saturate-[1.5] contrast-[1.1]' },
  { name: 'Fade', class: 'opacity-80 brightness-[1.1]' },
  { name: 'Drama', class: 'contrast-[1.4] brightness-[0.9]' }
];

export const Upload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [showFilters, setShowFilters] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowFilters(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowFilters(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setCaption('');
    setSelectedFilter(0);
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
    setShowFilters(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getImageStyle = () => {
    const filterClass = filters[selectedFilter].class;
    const customFilters = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`;
    return {
      filter: customFilters,
      className: filterClass
    };
  };

  const handleShare = async () => {
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Post shared successfully!",
      description: "Your post has been shared with your followers.",
    });
    
    setIsUploading(false);
    resetUpload();
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Upload Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold gradient-text mb-2">Create New Post</h1>
        <p className="text-muted-foreground">Share your moments with the world</p>
      </div>

      {!selectedImage ? (
        /* Upload Area */
        <div
          className="neuro-card p-8 text-center cursor-pointer hover:scale-105 transition-transform"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <UploadIcon className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Drag photos here</h3>
              <p className="text-muted-foreground mb-4">or click to select from your device</p>
              
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" className="neuro-card">
                  <Image className="w-4 h-4 mr-2" />
                  Photo
                </Button>
                <Button variant="outline" className="neuro-card">
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      ) : (
        /* Image Editor */
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="neuro-card p-4">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className={`w-full aspect-square object-cover rounded-lg ${getImageStyle().className}`}
                style={{ filter: getImageStyle().filter }}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetUpload}
                className="absolute top-2 right-2 neuro-card"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="neuro-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4" />
                <Label className="font-medium">Filters</Label>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                {filters.map((filter, index) => (
                  <button
                    key={filter.name}
                    onClick={() => setSelectedFilter(index)}
                    className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedFilter === index 
                        ? 'border-primary scale-95' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={selectedImage}
                      alt={filter.name}
                      className={`w-full h-full object-cover ${filter.class}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                      {filter.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Adjustment Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sliders className="w-4 h-4" />
                  <Label className="font-medium">Adjustments</Label>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">Brightness: {brightness[0]}%</Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={200}
                      min={50}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Contrast: {contrast[0]}%</Label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      max={200}
                      min={50}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Saturation: {saturation[0]}%</Label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      max={200}
                      min={0}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Caption */}
          <div className="neuro-card p-4">
            <Label className="font-medium mb-2 block">Write a caption</Label>
            <Textarea
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="neuro-inset bg-transparent resize-none"
              rows={3}
            />
            <div className="text-xs text-muted-foreground mt-2">
              {caption.length}/2200
            </div>
          </div>

          {/* Share Button */}
          <Button 
            className="w-full neuro-card hover:scale-105 bg-primary text-primary-foreground disabled:opacity-50"
            size="lg"
            onClick={handleShare}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              'Share Post'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};