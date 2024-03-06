from app.models import db, environment, SCHEMA, Customer, Product
from sqlalchemy.sql import text


def seed_products():
    location = 'https://miniamazon.s3.us-west-2.amazonaws.com/public/'
    username_to_ids = Customer.username_to_ids()
    categories = Product.allowed_categories()

    products = [
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Organic Blackberries, 6 Oz",
            "price": 4.69,
            "category": categories[0],
            "description": "Organic Blackberries taste best when they are very dark purplish-black to completely black. These berries are rich in antioxidants, especially in vitamin C. These berries have a tart-sweet flavor and can easily be consumed as a wonderfully plump and juicy snack....",
            "remaining": 10,
            "product_image": location + "black+berries.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Red Raspberries, 6 Oz",
            "price": 3.59,
            "category": categories[0],
            "description": "Raspberries can be found in assorted colors including gold, black and purple, but red raspberries are the most common. These fruits are as nutritious as they are beautiful....",
            "remaining": 50,
            "product_image": location + "raspberries.jpg"
        },
        {
            "seller_id": username_to_ids["zoro"],
            "name": "Andonstar AD246S-M HDMI Digital Microscope 2000x for Adults, 3 Lens 2160P UHD Video Record, 7 Inch LCD Soldering Microscope, Coin Microscope, Biological Microscope Kit, Windows Compatible",
            "price": 178.99,
            "category": categories[1],
            "description": "Lens L (60-240x) for Soldering and Repairing: Can be used to repair circuit boards, mobile phones, etc. Lens A (18-720x), can be used to observe whole coins or parts, plants, stones, etc. Lens D (1800-2040x), can be used to observe biological slides. Ultra high definition 2160P Video Record, while supporting HDMI output to a larger screen, allows you to see a more microscopic world and free your eyes all the time.",
            "remaining": 99,
            "product_image": location + "digital+microscope.jpg"
        },
        {
            "seller_id": username_to_ids["zoro"],
            "name": "DJI Mini 2 SE, Lightweight Mini Drone with QHD Video, 10km Video Transmission, 31-min Flight Time, Under 249 g, Return to Home, Drone with Camera for Beginners",
            "price": 299,
            "category": categories[1],
            "description": "Lightweight and Portable - The drone is lightweight and compact, weighing less than 249 𝗴𝗿𝗮𝗺𝘀. It's perfect for taking on hikes, road trips, and other adventures, allowing you to capture stunning aerial moments from above wherever you go. Enjoy longer flights with DJI Mini 2 SE, which offers a 31-min max flight time. Combo offers two additional Intelligent Flight Batteries (three in total) for up to 93 minutes of total flight time. Explore and create more.",
            "remaining": 86,
            "product_image": location + "mini+drone.jpg"
        },
        {
            "seller_id": username_to_ids["zoro"],
            "name": "Dragon Touch Action Camera 4K 20MP 30FPS 100FT Waterproof Underwater Camera 170° Wide Angle WiFi Sports Cam with Remote 2 Batteries and Mounting Accessories Kit",
            "price": 44.99,
            "category": categories[1],
            "description": "The 4K Action Camera with 4X Zoom allows you to capture breathtaking videos at professional quality, 4K/30FPS It also offers a 20MP photo resolution, ensuring that every exciting moment is beautifully preserved. With its waterproof case, this camera can withstand depths of up to 100ft (30m). This makes it perfect for water sports enthusiasts, enabling them to capture stunning underwater footage while swimming, surfing, diving, snorkeling, and more. The included wireless remote control can be worn on your wrist, allowing you to easily operate the camera while mounting it on your helmet or selfie stick. This ensures that you never miss recording those special moments, regardless of where you are.",
            "remaining": 39,
            "product_image": location + "camera.jpg"
        },
        {
            "seller_id": username_to_ids["sanji"],
            "name": "Blood Money: Why the Powerful Turn a Blind Eye While China Kills Americans Hardcover - February 27, 2024",
            "price": 22.38,
            "category": categories[2],
            "description": "It's often said that China is in a cold war with America. The reality is far worse: the war is hot, and the body count is one-sided. China is killing Americans and working aggressively to maximize the carnage while our leaders remain passive and, in some cases, compliant. Why? If anyone could crack the code, it's the renowned nonpartisan investigator Peter Schweizer. Schweizer's previous three number one New York Times bestsellers sent shock waves through official Washington, sparking FBI investigations and congressional probes that continue to this day.",
            "remaining": 8,
            "product_image": location + "book+blood+money.jpg"
        },
        {
            "seller_id": username_to_ids["sanji"],
            "name": "The Python Bible for Beginners: A Step-By-Step Guide to Master Coding from Scratch in Less Than 7 Days and Become the Expert that Top Companies Vie to Hire (with Hands-On Exercises and Code Snippets)",
            "price": 25.64,
            "category": categories[2],
            "description": "Imagine embarking on a learning journey where complexity is simplified, and every topic is meticulously organized for the most effective progression. We've engineered this guide with precision, aligning the best topics in an optimal sequence that ensures you grasp the fundamentals and advanced concepts of Python with remarkable speed and clarity. Forget the frustration of information overload;we deliver exactly what you need to know, when you need to know it! Bid farewell to the bafflement that often accompanies the learning process. Nicholas Kimmel breaks down Python programming into digestible, manageable segments, offering clear, step-by-step instructions that guide you from utter novice to confident coder. You'll experience the joy of your \"aha\" moments as you transition from asking \"What's Python?\" to exclaiming \"I can't believe I'm coding!\"",
            "remaining": 5,
            "product_image": location + "book+python+bible.jpg"
        },
        {
            "seller_id": username_to_ids["sanji"],
            "name": "Modern Java in Action: Lambdas, streams, functional and reactive programming 2nd Edition",
            "price": 54.99,
            "category": categories[2],
            "description": "Modern Java in Action connects new features of the Java language with their practical applications. Using crystal-clear examples and careful attention to detail, this book respects your time. It will help you expand your existing knowledge of core Java as you master modern additions like the Streams API and the Java Module System, explore new approaches to concurrency, and learn how functional concepts can help you write code that's easier to read and maintain.",
            "remaining": 0,
            "product_image": location + "book+java.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Refresh Tears Lubricant Eye Drops, 2 Count (Pack of 1)",
            "price": 14.68,
            "category": categories[3],
            "description": "Original strength formula. Relieves mild symptoms of eye dryness. Instantly moisturizes and lubricates. Designed to act like your own natural tears. Doctor recommended with over 30 years of experience; REFRESH Family of Products, Ipsos Healthcare, 2021 REFRESH ECP Recommendation Survey.",
            "remaining": 222,
            "product_image": location + "eyedrop.png"
        },
                {
            "seller_id": username_to_ids["haolam"],
            "name": "Hair Dryer - 150000 RPM High-Speed Brushless Motor Negative Ionic Blow Dryer for Fast Drying, Low Noise Thermo-Control Hair Dryer with Diffuser and Nozzle, Perfect for Gifts",
            "price": 99.98,
            "category": categories[3],
            "description": "Cosy Companions diffuser hair dryer is equipped with a high speed brushless motor of 150,000RPM, upgraded high powered to provide powerful airflow with 36m/s wind speed to dry hair in a short time, which is 5x faster than traditional hair dryers. It takes only 2-5 minutes to dry hair. Fast blow dry hair feels awesome! Cosy Companions Ionic hair dryer can release 500 million negative ions during the blow-drying process, which can balance the static electricity in your hair and make your hair not frizzy in the slightest, but also effectively lock in moisture, nourish your hair, make your hair soft, fluffy and stylish, and give your hair a healthy and natural shine.",
            "remaining": 44,
            "product_image": location + "hair+dryer.jpg"
        },
                {
            "seller_id": username_to_ids["haolam"],
            "name": "COSLUS Water Dental Flosser Teeth Pick: Portable Cordless Oral Irrigator 300ML Rechargeable Travel Irrigation Cleaner IPX7 Waterproof Electric Waterflosser Flossing Machine for Teeth Cleaning F5020E",
            "price": 35.99,
            "category": categories[3],
            "description": "The COSLUS water dental flosser boasts advanced 0.3mm+0.3mm ultra-fine dual-thread water pulse technology, professionally endorsed by an American dental team. This water dental pick delivers high water pressure pulses at 1400-1800 times per minute, effectively removing 99.9% of dental plaque for deep teeth cleaning. This water dental pick massages the gums, promotes blood circulation, and addresses oral issues like bad breath, orthodontic teeth.",
            "remaining": 9,
            "product_image": location + "water+flosser.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "TitanicToyCo RMS Titanic Model Ship or Britannic or Olympic 8\" Assembled Titanic Toys For Kids, Historically Accurate Titanic Toy, Titanic Ship, Titanic Cake Topper, Toy Ships, Titanic Boat",
            "price": 15.99,
            "category": categories[4],
            "description": "Behold the Titanic Toy for kids - now with a free Ice Berg accessory! At 8\" long, it's not just a gift, it's a calamity waiting to happen. Perfect for birthdays, holidays, or when you want to recreate history's most epic oopsie-daisy moment! Calling all model ship enthusiasts, collectors, and history buffs with a flair for the dramatic - this Titanic model is your ticket to reliving the \"unsinkable\" saga. Use it as a conversation starter or, better yet, an iceberg-dodging titanic cake topper. Who said history can't be deliciously decorative? Get ready for a 3D printed wonder that's all Titanic, all the time. It's like stepping back in time, but with a touch of whimsy that even the original iceberg would raise an eyebrow at. Our attention to detail is so spot-on, you'll swear you're hearing a distant Celine Dion ballad with this toy ship!" ,
            "remaining": 55,
            "product_image": location + "ship.jpg"
        },\
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Customizable Boy Puppet #2 - Professional Puppet Ministry, School, Church",
            "price": 89.00,
            "category": categories[4],
            "description": "This fun guy stands 18\" tall from hand opening to the top of his head and approx. 24\" overall. He is the perfect size for kids, adults and puppet teams! You can choose from 15 different skin and hair colors for a unique creation of your very own! These puppets are built by puppeteers so we know what's important. These puppets feature: Internal elbow seam. (Not exposed on the outside) FULLY lined body and head. (No exposed foam… anywhere) Quality fabrics and materials. (Including anti-pill fabric) Comfortable rounded mouth grip. (Not just flat) And a fun color t-shirt. (T-shirt color will vary) Removable legs are available for this puppet HERE. *This puppet is built at the time of order. Please allow 1-2 weeks for build time in addition to S&H. AVAILABLE IN BLACK LIGHT.",
            "remaining": 18,
            "product_image": location + "puppet.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Personalized Wooden Name Puzzle for Kids Personalized Name Puzzle for Toddlers Personalized Baby Gifts First Birthday Gift Personalized Puzzle Wooden Puzzles Custom Name Puzzle Baby & Toddler Toys",
            "price": 13.96,
            "category": categories[4],
            "description": "Make your gift unforgettable. We will write your wish on the puzzle and keep the memory of you and your gift for many years. ABSOLUTELY FREE. A personalized name puzzle is a hand-made toy that combines the Montessori technique, helping toddlers to learn how to spell their names, learn colors and develop motoric skills.",
            "remaining": 50,
            "product_image": location + "puzzle.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Medium Hass Avocado",
            "price": 1.29,
            "category": categories[0],
            "description": "The Hass avocado is known as the 'year-round avocado' because of its seasonal availability. Mexico is the world's largest producer of Hass avocados, best known for their creamy texture and great taste!",
            "remaining": 22,
            "product_image": location + "avocado.jpg"
        },
        {
            "seller_id": username_to_ids["robin"],
            "name": "Cherry Red Conventional, 16 Ounce",
            "price": 7.99,
            "category": categories[0],
            "description": "Luxardo Maraschino Cherries are famous. Marasca cherries are dark red, almost black candied cherries that have been soaked in thick marasca cherry syrup. The candying process gives Luxardo Maraschino Cherries a delightful crispiness that, along with its signature taste, makes it stand out amongst other cocktail cherries.",
            "remaining": 16,
            "product_image": location + "cherry.jpg"
        },
        {
            "seller_id": username_to_ids["mihawk"],
            "name": "Seedless Mini Watermelon",
            "price": 4.99,
            "category": categories[0],
            "description": "Customers like the taste of the watermelon, mentioning it's sweet and juicy. They do, however, have concerns about the texture, size and softness of the product. They say it' s over ripen, rubbery and has visible damage. Customers also have mixed opinions on freshness.",
            "remaining": 111,
            "product_image": location + "watermelon.jpg"
        },
        {
            "seller_id": username_to_ids["mihawk"],
            "name": "Skytech Gaming Nebula Gaming PC Desktop - Intel Core i5 13400F 2.5 GHz, NVIDIA RTX 3050, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit",
            "price": 749.99,
            "category": categories[1],
            "description": "INTEL Core i5 13400F 2.5GHz (4.6GHz Max Boost) CPU Processor | 1TB NVME SSD - Up to 30x Faster Than Traditional HDD NVIDIA Geforce RTX 3050 8GB GDDR6 Graphics Card (Brand may vary) | 16GB DDR4 RAM 3200 Gaming Memory with Heat Spreader | Windows 11 Home 64-bit 802.11 AC | No Bloatware | Graphic output options include 1 x HDMI, and 1 x Display Port Guaranteed, Additional Ports may vary | USB Ports Including 2.0, 3.0, and 3.2 Gen1 Ports | HD Audio and Mic | Free Gaming Keyboard and Mouse 4 RGB Fans for Maximum Air Flow | Skytech Nebula Black Edition with Front Mesh | 1 Year Warranty on Parts and Labor | Lifetime Free Technical Support | Assembled in the USA This powerful gaming PC is capable of running all your favorite games such as Call of Duty Warzone, Fornite, Escape from Tarkov, Grand Theft Auto V, Valorant, World of Warcraft, League of Legends, Apex Legends, Roblox, PLAYERUNKNOWN's Battlegrounds, Overwatch, Counter-Strike: Global Offensive, Battlefield V, New World, Minecraft, Elden Ring, Rocket League, The Division 2, and more at Ultra settings, detailed 1080p Full HD resolution, and smooth 60+ FPS gameplay.",
            "remaining": 2,
            "product_image": location + "pc.jpg"
        },
        {
            "seller_id": username_to_ids["robin"],
            "name": "PHILIPS 22 inch Class Thin Full HD (1920 x 1080) 75Hz Monitor, VESA, HDMI & VGA Port, 4 Year Advance Replacement Warranty, 221V8LN",
            "price": 69.99,
            "category": categories[1],
            "description": "CRISP CLARITY: This 22 inch class (21.45″ viewable) Philips V line monitor delivers crisp Full HD 1920x1080 visuals. Enjoy movies, shows and videos with remarkable detail INCREDIBLE CONTRAST: The VA panel produces brighter whites and deeper blacks. You get true-to-life images and more gradients with 16.7 million colors THE PERFECT VIEW: The 178/178 degree extra wide viewing angle prevents the shifting of colors when viewed from an offset angle, so you always get consistent colors WORK SEAMLESSLY: This sleek monitor is virtually bezel-free on three sides, so the screen looks even bigger for the viewer. This minimalistic design also allows for seamless multi-monitor setups that enhance your workflow and boost productivity A BETTER READING EXPERIENCE: For busy office workers, EasyRead mode provides a more paper-like experience for when viewing lengthy documents 75HZ FAST REFRESH RATE: 75 Hz (via HDMI 1.4) brings your favorite movies and video games to life. Stream, binge, and play effortlessly SMOOTH ACTION WITH ADAPTIVE-SYNC: Adaptive-Sync technology ensures fluid action sequences and rapid response time. Every frame will be rendered smoothly with crystal clarity and without stutter DESIGNED FOR YOUR WELLBEING: Philips monitors use LowBlue Mode to reduce harmful shortwave blue light. Flicker-free technology alleviates eye fatigue for more comfortable extended computing USER CONVENIENCE: Robust connections include HDMI 1.4, VGA and audio out. VESA compatibility gives you flexible mounting options PEACE OF MIND: Philips monitors come with 4-Year Advance Replacement Warranty in the United States, minimizing downtime",
            "remaining": 12,
            "product_image": location + "monitor.jpg"
        },
        {
            "seller_id": username_to_ids["robin"],
            "name": "Milk and Honey Paperback - October 6, 2015",
            "price": 6.26,
            "category": categories[2],
            "description": "#1 New York Times bestseller milk and honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity. The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.",
            "remaining": 3,
            "product_image": location + "book+milk+and+honey.jpg"
        },
        {
            "seller_id": username_to_ids["acee"],
            "name": "Earle The Psychology of Money Paperback - 1 September 2020",
            "price": 13.00,
            "category": categories[2],
            "description": "In the psychology of money, the author shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life?s most important matters.",
            "remaining": 17,
            "product_image": location + "book+pschyology+of+money.jpg"
        },
        {
            "seller_id": username_to_ids["nickyli"],
            "name": "Armitron Women's Day/Date Crystal Accented Dial Metal Bracelet Watch, 75/2475",
            "price": 26.92,
            "category": categories[3],
            "description": "Coin edge bezel; mineral crystal lens Mother-of-pearl dial with day/date calendar window; gold-tone hands and premium crystal markers; printed outer minute track Two-tone stainless steel bracelet; fold over clasp Case diameter: 24.5 millimeters Inner bracelet circumference: 7 inches Water-resistant to 165 feet (50 M): suitable for showering and short periods of swimming. Pull the crown out to set the time on calendar watch",
            "remaining": 33,
            "product_image": location + "watch-women.jpg"
        },
        {
            "seller_id": username_to_ids["nickyli"],
            "name": "Rolex Day-Date 40mm Sundust Set with Diamonds Dial Rose Gold Men's Watch 228235",
            "price": 55700.00,
            "category": categories[3],
            "description": "18k everose gold case with a 18k everose gold Rolex President bracelet Fixed - fluted 18k everose gold bezel Sundust dial with rose-gold tone hands and alternating Roman numeral and index hour markers Automatic movement. Rolex 3255 engine Scratch resistant sapphire crystal Screw down crown. Solid case back",
            "remaining": 5,
            "product_image": location + "watch-men.jpg"
        },
        {
            "seller_id": username_to_ids["zoro"],
            "name": "AMEROUS 15 Inches Magnetic Wooden Chess Set - 2 Extra Queens - Folding Board - Pieces Storage Slots, Handmade Portable Travel Chess Game - Beginner Chess Set for Kids, 6 up Age",
            "price": 29.99,
            "category": categories[4],
            "description": "INTELLIGENT ENLIGHTENMENT - Not only suitable for kids playing with fun, this magnetic chess set could be a useful tool to enlighten your family and stimulate their intelligence. Chess learning is no longer boring, but with joy and interest. Perfect for beginners and those indulged in electronic gadgets MAGNETIC CHESSMEN - The hand carved wood chess pieces are magnetically attached to the board and won't fall off during the game, which allows you to play the board game on the road, in car, airplane or any mobile vehicles EASY TO CARRY - Lightweight and folding board design makes it portable to carry around and easy to travel with. Compact board size fits your luggage or bag when travelling while chess pieces are large enough to handle, playing with comfort PREMIUM QUALITY - Handmade with high quality wooden material, the smooth surface of the entire chess board ensures optimal touch comfort while playing chess and checkers game. 2 extra queens are added to the board as free accessories at your disposal PERFECT GIFT - Promote the relationship between children and friends or parents, sharing board game, suitable for indoor and outdoor, widely used in schools, families, camping and travel, is the most popular board game, can be used as a gift at Christmas , Children's Day, birthday, New Year gift for children or friends, parents",
            "remaining": 15,
            "product_image": location + "chess.jpg"
        },
        {
            "seller_id": username_to_ids["sanji"],
            "name": "LEGO Disney Stitch Toy Building Kit, Disney Toy for 9 Year Old Kids, Buildable Figure with Ice Cream Cone, Fun Disney Gift for Girls, Boys and Lovers of The Hit Movie Lilo and Stitch, 43249",
            "price": 29.99,
            "category": categories[4],
            "description": "Disney’s Lilo and Stitch building set for kids - Buildable LEGO Disney Stitch toy for girls and boys ages 9 and up that sparks imagination as kids build the model, then play with and display it afterwards Disney Stitch character - This creative LEGO building set features a displayable model from Lilo and Stitch, a buildable ice cream cone and a flower that can be used to decorate the characte Moving parts - The buildable Stitch model includes ears that can move up or down and a turning head with space for the decorative flower, plus a hand that can hold the brick built ice cream cone Fun display - Create Stitch in his Hawaiian shirt, decorate him with an ice cream cone and flower, move his head and ears into different positions to show new expressions, then set him up on display Disney gift for kids - A building toy set featuring a Disney character with functions and accessories that makes a great gift for movie lovers, girls and boys ages 9 and up to share at school or home A helping hand - Let the LEGO Builder app guide kids on an intuitive building adventure, where they can save sets, track progress and zoom in and rotate models in 3D while they build Expand life skills - With this Disney toy for 9 year old kids, plus accessories and functions to enhance display, this buildable character construction toy helps foster life skills through fun",
            "remaining": 25,
            "product_image": location + "lego.jpg"
        }
    ]

    [db.session.add(Product(**product)) for product in products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
