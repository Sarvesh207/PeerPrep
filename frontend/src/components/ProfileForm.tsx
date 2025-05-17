
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  onComplete?: () => void;
}

const ProfileForm = ({ onComplete }: ProfileFormProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    if (onComplete) {
      onComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Help other developers find you for collaboration and interview prep
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select defaultValue="intermediate">
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Primary Goal</Label>
                <Select defaultValue="interview">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interview">Interview Preparation</SelectItem>
                    <SelectItem value="paircoding">Pair Programming</SelectItem>
                    <SelectItem value="project">Project Collaboration</SelectItem>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell other developers about yourself, your experience, and what you're looking to achieve"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Technologies</Label>
              <div className="flex gap-2">
                <Input 
                  id="skills" 
                  placeholder="Add a skill (e.g. React, TypeScript, Node.js)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={handleAddSkill}>
                  Add
                </Button>
              </div>
              
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="flex items-center gap-1 pl-3 pr-2 py-1.5"
                    >
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full p-0"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select defaultValue="evenings">
                <SelectTrigger>
                  <SelectValue placeholder="Select when you're available" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Weekday Evenings</SelectItem>
                  <SelectItem value="flexible">Flexible Schedule</SelectItem>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
