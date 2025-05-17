
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileCard, { ProfileData } from "./ProfileCard";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MessagePreview from "./MessagePreview";

// Mock data for developer profiles
const MOCK_PROFILES: ProfileData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    photoUrl: "",
    level: "Intermediate",
    skills: ["React", "TypeScript", "Node.js"],
    bio: "Full stack developer with 2 years of experience. Looking to practice system design interviews and frontend coding challenges.",
    goal: "Interview preparation for FAANG companies",
    matchPercentage: 95,
  },
  {
    id: "2",
    name: "Sam Rivera",
    photoUrl: "",
    level: "Advanced",
    skills: ["React", "TypeScript", "GraphQL", "AWS"],
    bio: "Frontend specialist with a background in UI/UX design. Interested in pair programming on open source projects.",
    goal: "Collaborative coding on web applications",
    matchPercentage: 87,
  },
  {
    id: "3",
    name: "Jamie Lee",
    photoUrl: "",
    level: "Expert",
    skills: ["TypeScript", "React", "Redux", "Next.js"],
    bio: "Senior developer with experience mentoring junior devs. Happy to help with interview prep and code reviews.",
    goal: "Mentorship and interview coaching",
    matchPercentage: 72,
  },
  {
    id: "4",
    name: "Taylor Moore",
    photoUrl: "",
    level: "Beginner",
    skills: ["JavaScript", "React", "CSS"],
    bio: "Recent bootcamp graduate looking to build projects and prepare for interviews. Eager to learn and collaborate.",
    goal: "Build portfolio projects together",
    matchPercentage: 65,
  },
];

const MatchingSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [messageProfile, setMessageProfile] = useState<ProfileData | null>(null);
  
  // Filter profiles based on search criteria
  const filteredProfiles = MOCK_PROFILES.filter(profile => {
    const matchesSearch = searchTerm === "" || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSkill = selectedSkill === "" || 
      profile.skills.some(skill => skill.toLowerCase() === selectedSkill.toLowerCase());
      
    const matchesGoal = selectedGoal === "" || 
      profile.goal.toLowerCase().includes(selectedGoal.toLowerCase());
      
    return matchesSearch && matchesSkill && matchesGoal;
  });
  
  const handleMessageClick = (profileId: string) => {
    const profile = MOCK_PROFILES.find(p => p.id === profileId);
    if (profile) {
      setMessageProfile(profile);
    }
  };
  
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 flex items-center gap-2 bg-background rounded-lg border px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search by name, skills, or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-skills">All Skills</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="GraphQL">GraphQL</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedGoal} onValueChange={setSelectedGoal}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-goals">All Goals</SelectItem>
                <SelectItem value="interview">Interview Prep</SelectItem>
                <SelectItem value="pair">Pair Programming</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="mentor">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onMessage={handleMessageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedSkill("");
              setSelectedGoal("");
            }}>
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Message Dialog */}
        <Dialog open={!!messageProfile} onOpenChange={() => setMessageProfile(null)}>
          <DialogContent className="sm:max-w-md">
            {messageProfile && (
              <MessagePreview profile={messageProfile} onClose={() => setMessageProfile(null)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MatchingSection;
