
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface Donghua {
  id: string;
  title: string;
  poster_url: string | null;
  year: number | null;
  description: string | null;
}

const Index = () => {
  const [featuredDonghua, setFeaturedDonghua] = useState<Donghua[]>([]);
  const [newReleases, setNewReleases] = useState<Donghua[]>([]);
  const [popularDonghua, setPopularDonghua] = useState<Donghua[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDonghuaData = async () => {
      try {
        // Fetch featured donghua
        const { data: featured, error: featuredError } = await supabase
          .from('donghua')
          .select('*')
          .not('poster_url', 'is', null)
          .order('created_at', { ascending: false })
          .limit(6);

        if (featuredError) throw featuredError;
        setFeaturedDonghua(featured || []);

        // Fetch new releases
        const { data: newest, error: newError } = await supabase
          .from('donghua')
          .select('*')
          .order('year', { ascending: false })
          .limit(6);

        if (newError) throw newError;
        setNewReleases(newest || []);

        // Fetch popular donghua
        const { data: popular, error: popularError } = await supabase
          .from('donghua')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (popularError) throw popularError;
        setPopularDonghua(popular || []);
      } catch (error) {
        console.error('Error fetching donghua data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load content. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonghuaData();
  }, [toast]);

  const DonghuaCard = ({ donghua }: { donghua: Donghua }) => {
    return (
      <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
        <div className="relative">
          <Link to={`/donghua/${donghua.id}`}>
            <img 
              src={donghua.poster_url || `https://via.placeholder.com/300x450?text=${encodeURIComponent(donghua.title)}`} 
              alt={donghua.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <Button variant="secondary">Watch Now</Button>
            </div>
          </Link>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{donghua.title}</h3>
          {donghua.year && <p className="text-sm text-gray-500 dark:text-gray-400">{donghua.year}</p>}
        </div>
      </div>
    );
  };

  const DonghuaSection = ({ title, donghua }: { title: string, donghua: Donghua[] }) => {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Link to="/browse" className="text-blue-600 hover:underline">View All</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : donghua.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {donghua.map((item) => (
                <DonghuaCard key={item.id} donghua={item} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12">No content available.</p>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-700 dark:bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Discover the Best Donghua</h1>
            <p className="text-xl mb-8">Stream the latest and most popular Chinese animations</p>
            <Button asChild size="lg">
              <Link to="/browse">Browse Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <DonghuaSection title="Featured Donghua" donghua={featuredDonghua} />
      <DonghuaSection title="New Releases" donghua={newReleases} />
      <DonghuaSection title="Popular This Week" donghua={popularDonghua} />
    </div>
  );
};

export default Index;
