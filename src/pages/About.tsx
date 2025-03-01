
import React from "react";
import Layout from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <Layout>
      <div className="pt-24 pb-12">
        <Section className="max-w-6xl mx-auto">
          <SectionHeader 
            title="About Capstone" 
            description="Premium quality caps designed for style and comfort"
            align="center"
          />
          
          <Tabs defaultValue="our-story" className="w-full mt-8">
            <TabsList className="flex w-full justify-center mb-8">
              <TabsTrigger value="our-story">Our Story</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="packaging">Packaging</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="our-story" className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="h3 mb-4">Crafted with Passion</h3>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2023, Capstone was born from a simple idea: to create high-quality, stylish caps that stand out from mass-produced alternatives.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our journey began when our founder, an avid cap enthusiast, couldn't find caps that met both style and quality standards. What started as a passion project quickly grew into a brand dedicated to craftsmanship and innovation.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we continue to push boundaries with trending designs, premium materials, and exceptional attention to detail. Each cap represents our commitment to quality and our passion for helping you express your unique style.
                  </p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1539110110459-58c95a769da9?q=80&w=1169&auto=format&fit=crop" 
                  alt="Our workshop" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img 
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop" 
                  alt="Premium materials" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                <div>
                  <h3 className="h3 mb-4">Premium Materials</h3>
                  <p className="text-muted-foreground mb-4">
                    At Capstone, we believe that exceptional caps start with exceptional materials. We source only the finest fabrics and components from trusted suppliers around the world.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Premium Cotton:</strong> Our 100% premium cotton provides unmatched comfort and durability.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Quality Hardware:</strong> We use brass buckles and reinforced eyelets that withstand daily wear.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Precision Stitching:</strong> Every cap undergoes meticulous stitching for structural integrity and clean aesthetics.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>UV Protection:</strong> Many of our fabrics include UV-resistant properties to keep you protected on sunny days.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="packaging" className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="h3 mb-4">Premium Packaging</h3>
                  <p className="text-muted-foreground mb-4">
                    We believe the experience of receiving your Capstone cap should be as exceptional as wearing it. That's why we've carefully designed our packaging to reflect the premium nature of our products.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Signature Box:</strong> Each cap comes in our signature matte black box with embossed Capstone logo.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Protective Elements:</strong> Custom-molded inserts ensure your cap arrives in perfect condition.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Care Instructions:</strong> Detailed care guide to help maintain your cap's quality for years.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Sustainable Materials:</strong> Recycled and recyclable packaging components wherever possible.</span>
                    </li>
                  </ul>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1607548932528-4f458e696286?q=80&w=1172&auto=format&fit=crop" 
                  alt="Premium packaging" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="sustainability" className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1174&auto=format&fit=crop" 
                  alt="Sustainability efforts" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                <div>
                  <h3 className="h3 mb-4">Our Commitment to Sustainability</h3>
                  <p className="text-muted-foreground mb-4">
                    We believe that creating premium products shouldn't come at the expense of our planet. That's why sustainability is at the core of everything we do at Capstone.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Eco-Friendly Materials:</strong> We're increasingly incorporating organic cotton and recycled materials into our products.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Ethical Production:</strong> We partner with factories that ensure fair wages and safe working conditions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Carbon Offset:</strong> We offset the carbon footprint of our shipping through verified environmental projects.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">•</span>
                      <span><strong>Waste Reduction:</strong> Our design process minimizes fabric waste, and we're working toward zero-waste production.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Section>
      </div>
    </Layout>
  );
};

export default About;
