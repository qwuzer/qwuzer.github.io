import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import hachiwareImage from "@/assets/hachiware.jpg";

export const AboutWindow = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img 
            src={hachiwareImage} 
            alt="William Chang" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">William Chang</h2>
          <p className="text-lg text-primary">Master's Student/ Developer</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Passionate student that builds apps, webpages and is researching in computer vision and machine learning. 
            I am currently pursuing a Master's degree in Computer Science and Information Engineering at National Taiwan Normal University (NTNU).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="text-sm font-medium">Taipei, Taiwan</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <a 
                href="mailto:thsg314@gmail.com" 
                className="text-sm font-medium hover:text-primary hover:underline transition-colors"
              >
                thsg314@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="text-sm font-medium">0976 312 505</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Availability</div>
              <div className="text-sm font-medium">Open to opportunities🤩</div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "Swift", "C/C++", "React", "PostgreSQL", "Git", "Docker"].map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
