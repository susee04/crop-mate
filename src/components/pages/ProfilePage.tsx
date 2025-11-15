import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Calendar, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ChatHistory } from '@/entities';
import { useMember } from '@/integrations';
import { useLanguageStore } from '@/stores/languageStore';
import { useThemeStore } from '@/stores/themeStore';

const ProfilePage = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { member, actions } = useMember();
  const { t } = useLanguageStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (member?._id) {
      loadUserChatHistory();
    }
  }, [member]);

  const loadUserChatHistory = async () => {
    if (!member?._id) return;
    
    try {
      const { items } = await BaseCrudService.getAll<ChatHistory>('chathistory');
      const userChats = items
        .filter(chat => chat.userId === member._id)
        .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
      
      setChatHistory(userChats);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (member?.profile?.nickname) return member.profile.nickname;
    if (member?.contact?.firstName && member?.contact?.lastName) {
      return `${member.contact.firstName} ${member.contact.lastName}`;
    }
    if (member?.contact?.firstName) return member.contact.firstName;
    if (member?.loginEmail) return member.loginEmail.split('@')[0];
    return 'User';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('home')}
              </Button>
            </Link>
            <h1 className="text-4xl font-heading font-bold text-primary">
              {t('profile')}
            </h1>
            <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2">
              Manage your account and view your activity
            </p>
          </div>
          <div className="text-6xl">👤</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage 
                    src={member?.profile?.photo?.url} 
                    alt={getUserDisplayName()}
                  />
                  <AvatarFallback className="text-2xl font-heading font-bold bg-primary text-primary-foreground">
                    {getInitials(getUserDisplayName())}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                  {getUserDisplayName()}
                </h2>
                
                {member?.profile?.title && (
                  <p className="text-gray-600 dark:text-gray-300 font-paragraph">
                    {member.profile.title}
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member?.loginEmail || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Member Since</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(member?._createdDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Status</p>
                    <Badge variant={member?.status === 'APPROVED' ? 'default' : 'secondary'}>
                      {member?.status || 'Unknown'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={actions.logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('signOut')}
                </Button>
              </div>
            </Card>
          </div>

          {/* Chat History */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-heading font-semibold">Chat History</h2>
                </div>
                <Badge variant="secondary">
                  {chatHistory.length} conversations
                </Badge>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300">Loading chat history...</p>
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold mb-2">No Chat History</h3>
                  <p className="font-paragraph text-gray-600 dark:text-gray-300 mb-4">
                    Start a conversation with our AI assistant to see your chat history here.
                  </p>
                  <Link to="/">
                    <Button>
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {chatHistory.map((chat, index) => (
                    <motion.div
                      key={chat._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">You</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(chat.timestamp)} at {formatTime(chat.timestamp)}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {chat.userMessage && (
                          <div className="bg-primary/10 rounded-lg p-3">
                            <p className="font-paragraph text-sm">{chat.userMessage}</p>
                          </div>
                        )}
                        
                        {chat.aiResponse && (
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                              <p className="font-paragraph text-sm">{chat.aiResponse}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
            
            {/* Activity Summary */}
            <Card className="p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {chatHistory.length}
                  </div>
                  <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">
                    Total Conversations
                  </p>
                </div>
                
                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {chatHistory.filter(chat => 
                      new Date(chat.timestamp || 0).toDateString() === new Date().toDateString()
                    ).length}
                  </div>
                  <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">
                    Today's Chats
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {Math.ceil((Date.now() - new Date(member?._createdDate || 0).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <p className="text-sm font-paragraph text-gray-600 dark:text-gray-300">
                    Days Active
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;