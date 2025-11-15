import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LogIn, Leaf, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const LoginPage = () => {
  const { actions } = useMember();
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  const features = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Smart Farming Guidance",
      description: "Get AI-powered advice on crops, pests, and soil management"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Profile",
      description: "Your farming data and chat history are safely stored"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Access",
      description: "Connect with other farmers and agricultural experts"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Assistance",
      description: "24/7 AI chatbot support for all your farming questions"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🌾</div>
            <h1 className="text-2xl font-heading font-bold text-primary">Crop Mate</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4"
              >
                Welcome to Crop Mate
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl font-paragraph text-gray-600 dark:text-gray-300 mb-8"
              >
                Your intelligent farming companion powered by AI. Sign in to access personalized farming guidance, chat history, and expert recommendations.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <div className="text-center mb-6">
                  <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-semibold mb-2">Sign In to Continue</h2>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">
                    Access your personalized farming dashboard and chat history
                  </p>
                </div>

                <Button
                  onClick={actions.login}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                  size="lg"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In with Wix
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">
                    New to Crop Mate? Signing in will automatically create your account.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-xs text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="https://static.wixstatic.com/media/7cdd40_926972fb92c14c02b8a0702e3385f06f~mv2.png?originWidth=448&originHeight=384"
                  alt="Farmer using technology for smart farming"
                  className="w-full max-w-lg mx-auto"
                  width={500}
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <Leaf className="h-8 w-8 text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-10 w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center"
              >
                <Zap className="h-6 w-6 text-secondary" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-primary mb-8">
            Why Choose Crop Mate?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-heading font-semibold mb-2">AI-Powered Assistant</h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Get instant answers to your farming questions with our intelligent chatbot
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-heading font-semibold mb-2">Voice Commands</h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Speak naturally and get voice responses in multiple Indian languages
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-heading font-semibold mb-2">Comprehensive Data</h3>
              <p className="font-paragraph text-gray-600 dark:text-gray-300">
                Access detailed information on crops, pests, soil, weather, and market prices
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;