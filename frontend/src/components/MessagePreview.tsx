
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useState } from "react";
import type { ProfileData } from "./ProfileCard";

interface MessagePreviewProps {
  profile: ProfileData;
  onClose: () => void;
}

const MessagePreview = ({ profile, onClose }: MessagePreviewProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setIsSending(true);
    
    // In a real app, this would send the message to an API
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Message sent to ${profile.name}`);
      onClose();
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {profile.photoUrl ? (
          <img 
            src={profile.photoUrl} 
            alt={profile.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-codemate-purple"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        
        <div>
          <h3 className="font-semibold">{profile.name}</h3>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Online now
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-3">
        <div className="text-sm font-medium mb-1">Suggested topics:</div>
        <div className="space-y-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs h-auto py-1.5"
            onClick={() => setMessage("Hi! I noticed we both use React and TypeScript. Would you be interested in practicing some interview questions together?")}
          >
            Ask about interview prep
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs h-auto py-1.5"
            onClick={() => setMessage(`Hi ${profile.name}! I'm looking for a coding partner to work on a small project. Would you be interested in collaborating?`)}
          >
            Suggest pair programming
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs h-auto py-1.5"
            onClick={() => setMessage("Hello! I see we have similar tech stacks. I'd love to connect and maybe we can help each other grow as developers.")}
          >
            General introduction
          </Button>
        </div>
      </div>
      
      <Textarea
        placeholder={`Write a message to ${profile.name}...`}
        className="min-h-[120px] resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSend} disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
};

export default MessagePreview;
