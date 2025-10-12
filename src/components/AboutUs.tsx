import React from 'react';
import { useApp } from '../App';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Leaf, Heart, Shield, Users, Award, Globe } from 'lucide-react';

const translations = {
  en: {
    aboutUs: 'About Afiya Zone',
    ourStory: 'Our Story',
    ourMission: 'Our Mission',
    ourValues: 'Our Values',
    ourTeam: 'Our Team',
    storyTitle: 'Founded on Wellness, Built with Care',
    storyText: 'Afiya Zone was born from a simple belief: everyone deserves access to natural, high-quality wellness products that truly make a difference. Founded in 2020 by wellness enthusiasts and health professionals, we started our journey with a mission to bridge the gap between traditional healing wisdom and modern scientific research.',
    storyText2: 'What began as a small family business has grown into a trusted wellness destination, serving thousands of customers across the Middle East. Our commitment to quality, transparency, and customer care remains at the heart of everything we do.',
    missionTitle: 'Empowering Your Wellness Journey',
    missionText: 'Our mission is to make premium natural wellness products accessible to everyone. We carefully curate each product in our collection, ensuring it meets our strict standards for quality, purity, and effectiveness. From supplements and skincare to herbal remedies and wellness accessories, every item is chosen with your health and well-being in mind.',
    missionText2: 'We believe that wellness is not just about products – it\'s about education, community, and support. That\'s why we provide comprehensive information about each product, wellness tips, and personalized guidance to help you make informed decisions about your health.',
    naturalQuality: 'Natural Quality',
    naturalQualityDesc: 'We source only the finest natural ingredients, working directly with trusted suppliers who share our commitment to quality and sustainability.',
    transparency: 'Transparency',
    transparencyDesc: 'Complete transparency in our sourcing, manufacturing, and business practices. You deserve to know exactly what you\'re putting in your body.',
    customerFirst: 'Customer First',
    customerFirstDesc: 'Your health and satisfaction are our top priorities. We\'re here to support you every step of your wellness journey.',
    innovation: 'Innovation',
    innovationDesc: 'We constantly research and innovate to bring you the latest and most effective wellness solutions backed by science.',
    sustainability: 'Sustainability',
    sustainabilityDesc: 'Committed to protecting our planet through eco-friendly packaging and sustainable business practices.',
    community: 'Community',
    communityDesc: 'Building a community of wellness enthusiasts who support and inspire each other toward better health.',
    founderName: 'Dr. Sarah Al-Zahra',
    founderTitle: 'Founder & CEO',
    founderBio: 'Certified nutritionist and wellness expert with over 15 years of experience in natural health and traditional medicine.',
    teamMember1: 'Ahmed Hassan',
    teamTitle1: 'Head of Product Development',
    teamBio1: 'Biochemist specializing in natural product research and development with a passion for creating effective wellness solutions.',
    teamMember2: 'Fatima Al-Rashid',
    teamTitle2: 'Customer Wellness Specialist',
    teamBio2: 'Certified health coach dedicated to helping customers find the right products for their individual wellness needs.',
    joinCommunity: 'Join our growing community of wellness enthusiasts and start your journey to better health today.',
  },
  ar: {
    aboutUs: 'من نحن - منطقة العافية',
    ourStory: 'قصتنا',
    ourMission: 'مهمتنا',
    ourValues: 'قيمنا',
    ourTeam: 'فريقنا',
    storyTitle: 'تأسست على العافية، بُنيت بالعناية',
    storyText: 'وُلدت منطقة العافية من إيمان بسيط: الجميع يستحق الوصول إلى منتجات العافية الطبيعية عالية الجودة التي تحدث فرقاً حقيقياً. تأسست في عام 2020 من قبل عشاق العافية والمهنيين الصحيين، بدأنا رحلتنا بمهمة سد الفجوة بين حكمة الشفاء التقليدية والبحث العلمي الحديث.',
    storyText2: 'ما بدأ كعمل عائلي صغير نما ليصبح وجهة عافية موثوقة، تخدم آلاف العملاء عبر الشرق الأوسط. يبقى التزامنا بالجودة والشفافية ورعاية العملاء في قلب كل ما نقوم به.',
    missionTitle: 'تمكين رحلة عافيتك',
    missionText: 'مهمتنا هي جعل منتجات العافية الطبيعية المميزة في متناول الجميع. نختار بعناية كل منتج في مجموعتنا، مضمونين أنه يلبي معاييرنا الصارمة للجودة والنقاء والفعالية. من المكملات الغذائية ومنتجات العناية بالبشرة إلى العلاجات العشبية وإكسسوارات العافية، كل عنصر مختار مع أخذ صحتك ورفاهيتك في الاعتبار.',
    missionText2: 'نؤمن أن العافية ليست فقط عن المنتجات - إنها عن التعليم والمجتمع والدعم. لهذا نوفر معلومات شاملة حول كل منتج ونصائح العافية والإرشاد الشخصي لمساعدتك في اتخاذ قرارات مدروسة حول صحتك.',
    naturalQuality: 'الجودة الطبيعية',
    naturalQualityDesc: 'نحصل فقط على أجود المكونات الطبيعية، نعمل مباشرة مع الموردين الموثوقين الذين يشاركوننا الالتزام بالجودة والاستدامة.',
    transparency: 'الشفافية',
    transparencyDesc: 'شفافية كاملة في الحصول على المواد والتصنيع وممارسات الأعمال. تستحق أن تعرف بالضبط ما تضعه في جسمك.',
    customerFirst: 'العميل أولاً',
    customerFirstDesc: 'صحتك ورضاك هما أولوياتنا العليا. نحن هنا لدعمك في كل خطوة من رحلة عافيتك.',
    innovation: 'الابتكار',
    innovationDesc: 'نبحث ونبتكر باستمرار لنقدم لك أحدث وأكثر حلول العافية فعالية مدعومة بالعلم.',
    sustainability: 'الاستدامة',
    sustainabilityDesc: 'ملتزمون بحماية كوكبنا من خلال التغليف الصديق للبيئة والممارسات التجارية المستدامة.',
    community: 'المجتمع',
    communityDesc: 'بناء مجتمع من عشاق العافية الذين يدعمون ويلهمون بعضهم البعض نحو صحة أفضل.',
    founderName: 'د. سارة الزهراء',
    founderTitle: 'المؤسس والرئيس التنفيذي',
    founderBio: 'خبيرة تغذية معتمدة وخبيرة عافية مع أكثر من 15 عاماً من الخبرة في الصحة الطبيعية والطب التقليدي.',
    teamMember1: 'أحمد حسن',
    teamTitle1: 'رئيس تطوير المنتجات',
    teamBio1: 'عالم كيمياء حيوية متخصص في بحث وتطوير المنتجات الطبيعية مع شغف لإنشاء حلول عافية فعالة.',
    teamMember2: 'فاطمة الراشد',
    teamTitle2: 'أخصائية عافية العملاء',
    teamBio2: 'مدربة صحة معتمدة مكرسة لمساعدة العملاء في العثور على المنتجات المناسبة لاحتياجات عافيتهم الفردية.',
    joinCommunity: 'انضم إلى مجتمعنا المتنامي من عشاق العافية وابدأ رحلتك نحو صحة أفضل اليوم.',
  },
};

export function AboutUs() {
  const { language } = useApp();
  const t = translations[language];

  const values = [
    {
      icon: Leaf,
      title: t.naturalQuality,
      description: t.naturalQualityDesc,
    },
    {
      icon: Shield,
      title: t.transparency,
      description: t.transparencyDesc,
    },
    {
      icon: Heart,
      title: t.customerFirst,
      description: t.customerFirstDesc,
    },
    {
      icon: Award,
      title: t.innovation,
      description: t.innovationDesc,
    },
    {
      icon: Globe,
      title: t.sustainability,
      description: t.sustainabilityDesc,
    },
    {
      icon: Users,
      title: t.community,
      description: t.communityDesc,
    },
  ];

  const teamMembers = [
    {
      name: t.founderName,
      title: t.founderTitle,
      bio: t.founderBio,
      image: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG5hdHVyYWwlMjBwcm9kdWN0cyUyMHNwYXxlbnwxfHx8fDE3NTkwNzU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: t.teamMember1,
      title: t.teamTitle1,
      bio: t.teamBio1,
      image: 'https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: t.teamMember2,
      title: t.teamTitle2,
      bio: t.teamBio2,
      image: 'https://images.unsplash.com/photo-1723392197044-515b81ec57cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2tpbmNhcmUlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzU5MDc1NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl text-green-800 mb-6">{t.aboutUs}</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-green-800 mb-6">{t.ourStory}</h2>
              <h3 className="text-xl text-green-700 mb-4">{t.storyTitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.storyText}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.storyText2}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-300/30 rounded-3xl transform rotate-3"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG5hdHVyYWwlMjBwcm9kdWN0cyUyMHNwYXxlbnwxfHx8fDE3NTkwNzU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Story"
                className="relative w-full h-96 object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-300/30 rounded-3xl transform -rotate-3"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Mission"
                className="relative w-full h-96 object-cover rounded-3xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl text-green-800 mb-6">{t.ourMission}</h2>
              <h3 className="text-xl text-green-700 mb-4">{t.missionTitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.missionText}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.missionText2}
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">{t.ourValues}</h2>
            <div className="w-16 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg text-green-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">{t.ourTeam}</h2>
            <div className="w-16 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full mx-auto"></div>
                  </div>
                  <h3 className="text-xl text-green-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-3xl py-16 px-8 text-white">
          <h2 className="text-3xl mb-6">Welcome to Afiya Zone</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            {t.joinCommunity}
          </p>
        </section>
      </div>
    </div>
  );
}