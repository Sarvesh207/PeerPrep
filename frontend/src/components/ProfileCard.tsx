
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Code, Heart, MessageSquare, Star, User } from "lucide-react";
import { useState } from "react";

export interface ProfileData {
  id: string;
  name: string;
  photoUrl: string;
  level: string;
  skills: string[];
  bio: string;
  goal: string;
  matchPercentage: number;
}

interface ProfileCardProps {
  profile: ProfileData;
  onMessage?: (profileId: string) => void;
}

const ProfileCard = ({ profile, onMessage }: ProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleMessageClick = () => {
    if (onMessage) {
      onMessage(profile.id);
    }
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden card-hover">
      <div 
        className="h-4 bg-gradient-to-r from-codemate-purple to-codemate-blue"
        style={{ 
          width: `${profile.matchPercentage}%`,
          transition: 'width 1s ease-in-out'
        }}
      />
      
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="relative">
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
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {profile.level}
              </span>
              <span className="text-xs text-muted-foreground">{profile.matchPercentage}% Match</span>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="flex gap-1 items-center">
          <Code className="h-3 w-3" />
          <span>{profile.skills[0]}</span>
        </Badge>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
          
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Looking for</h4>
            <p className="text-sm">{profile.goal}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          className={isLiked ? "gap-1" : "gap-1 hover:text-rose-500 hover:border-rose-500"}
          onClick={handleLikeClick}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
          {isLiked ? "Matched" : "Connect"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleMessageClick}
        >
          <MessageSquare className="h-4 w-4" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
