from app.models import db, environment, SCHEMA, Customer, Product
from sqlalchemy.sql import text


def seed_products():
    location = 'https://miniamazon.s3.us-west-2.amazonaws.com/public/'
    username_to_ids = Customer.username_to_ids()
    categories = Product.allowed_categories()

    products = [
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Meidum Hass Avocado",
            "price": 1.29,
            "category": categories[0],
            "description": "The Hass avocado is known as the 'year-round avocado' because of its seasonal availability. Mexico is the world's largest producer of Hass avocados, best known for their creamy texture and great taste!",
            "remaining": 22,
            "product_image": location + "avocado.jpg"
        },
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
            "product_image": location + "red+raspberries.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Andonstar AD246S-M HDMI Digital Microscope 2000x for Adults, 3 Lens 2160P UHD Video Record, 7 Inch LCD Soldering Microscope, Coin Microscope, Biological Microscope Kit, Windows Compatible",
            "price": 178.99,
            "category": categories[1],
            "description": "Lens L (60-240x) for Soldering and Repairing: Can be used to repair circuit boards, mobile phones, etc. Lens A (18-720x), can be used to observe whole coins or parts, plants, stones, etc. Lens D (1800-2040x), can be used to observe biological slides. Ultra high definition 2160P Video Record, while supporting HDMI output to a larger screen, allows you to see a more microscopic world and free your eyes all the time.",
            "remaining": 99,
            "product_image": location + "digital+microscope.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "DJI Mini 2 SE, Lightweight Mini Drone with QHD Video, 10km Video Transmission, 31-min Flight Time, Under 249 g, Return to Home, Drone with Camera for Beginners",
            "price": 299,
            "category": categories[1],
            "description": "Lightweight and Portable - The drone is lightweight and compact, weighing less than 249 𝗴𝗿𝗮𝗺𝘀. It's perfect for taking on hikes, road trips, and other adventures, allowing you to capture stunning aerial moments from above wherever you go. Enjoy longer flights with DJI Mini 2 SE, which offers a 31-min max flight time. Combo offers two additional Intelligent Flight Batteries (three in total) for up to 93 minutes of total flight time. Explore and create more.",
            "remaining": 86,
            "product_image": location + "mini+drone.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Dragon Touch Action Camera 4K 20MP 30FPS 100FT Waterproof Underwater Camera 170° Wide Angle WiFi Sports Cam with Remote 2 Batteries and Mounting Accessories Kit",
            "price": 44.99,
            "category": categories[1],
            "description": "The 4K Action Camera with 4X Zoom allows you to capture breathtaking videos at professional quality, 4K/30FPS It also offers a 20MP photo resolution, ensuring that every exciting moment is beautifully preserved. With its waterproof case, this camera can withstand depths of up to 100ft (30m). This makes it perfect for water sports enthusiasts, enabling them to capture stunning underwater footage while swimming, surfing, diving, snorkeling, and more. The included wireless remote control can be worn on your wrist, allowing you to easily operate the camera while mounting it on your helmet or selfie stick. This ensures that you never miss recording those special moments, regardless of where you are.",
            "remaining": 39,
            "product_image": location + "camera.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Blood Money: Why the Powerful Turn a Blind Eye While China Kills Americans Hardcover - February 27, 2024",
            "price": 22.38,
            "category": categories[2],
            "description": "It's often said that China is in a cold war with America. The reality is far worse: the war is hot, and the body count is one-sided. China is killing Americans and working aggressively to maximize the carnage while our leaders remain passive and, in some cases, compliant. Why? If anyone could crack the code, it's the renowned nonpartisan investigator Peter Schweizer. Schweizer's previous three number one New York Times bestsellers sent shock waves through official Washington, sparking FBI investigations and congressional probes that continue to this day.",
            "remaining": 8,
            "product_image": location + "book+blood+money.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "The Python Bible for Beginners: A Step-By-Step Guide to Master Coding from Scratch in Less Than 7 Days and Become the Expert that Top Companies Vie to Hire (with Hands-On Exercises and Code Snippets)",
            "price": 25.64,
            "category": categories[2],
            "description": "Imagine embarking on a learning journey where complexity is simplified, and every topic is meticulously organized for the most effective progression. We've engineered this guide with precision, aligning the best topics in an optimal sequence that ensures you grasp the fundamentals and advanced concepts of Python with remarkable speed and clarity. Forget the frustration of information overload;we deliver exactly what you need to know, when you need to know it! Bid farewell to the bafflement that often accompanies the learning process. Nicholas Kimmel breaks down Python programming into digestible, manageable segments, offering clear, step-by-step instructions that guide you from utter novice to confident coder. You'll experience the joy of your \"aha\" moments as you transition from asking \"What's Python?\" to exclaiming \"I can't believe I'm coding!\"",
            "remaining": 5,
            "product_image": location + "book+python+bible.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Modern Java in Action: Lambdas, streams, functional and reactive programming 2nd Edition",
            "price": 54.99,
            "category": categories[2],
            "description": "Modern Java in Action connects new features of the Java language with their practical applications. Using crystal-clear examples and careful attention to detail, this book respects your time. It will help you expand your existing knowledge of core Java as you master modern additions like the Streams API and the Java Module System, explore new approaches to concurrency, and learn how functional concepts can help you write code that's easier to read and maintain.",
            "remaining": 1,
            "product_image": location + "book+java.jpg"
        },
        {
            "seller_id": username_to_ids["haolam"],
            "name": "Refresh Tears Lubricant Eye Drops, 2 Count (Pack of 1)",
            "price": 14.68,
            "category": categories[3],
            "description": "Original strength formula. Relieves mild symptoms of eye dryness. Instantly moisturizes and lubricates. Designed to act like your own natural tears. Doctor recommended with over 30 years of experience; REFRESH Family of Products, Ipsos Healthcare, 2021 REFRESH ECP Recommendation Survey.",
            "remaining": 222,
            "product_image": location + "eyedrop.webp"
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
            "name": "Customizable Boy Puppet #2 - Professional Puppet Ministry, School, Church",
            "price": 89.00,
            "category": categories[4],
            "description": "This fun guy stands 18\" tall from hand opening to the top of his head and approx. 24\" overall. He is the perfect size for kids, adults and puppet teams! You can choose from 15 different skin and hair colors for a unique creation of your very own! These puppets are built by puppeteers so we know what's important. These puppets feature: Internal elbow seam. (Not exposed on the outside) FULLY lined body and head. (No exposed foam… anywhere) Quality fabrics and materials. (Including anti-pill fabric) Comfortable rounded mouth grip. (Not just flat) And a fun color t-shirt. (T-shirt color will vary) Removable legs are available for this puppet HERE. *This puppet is built at the time of order. Please allow 1-2 weeks for build time in addition to S&H. AVAILABLE IN BLACK LIGHT.",
            "remaining": 18,
            "product_image": location + "puppet.jpg"
        },
    ]

    [db.session.add(Product(**product)) for product in products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
