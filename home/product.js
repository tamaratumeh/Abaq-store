document.addEventListener('DOMContentLoaded', () => {
    // تهيئة التخزين المحلي
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // دالة تحديث العدادات
    const updateBadges = () => {
        // تحديث عداد الأماني
        const wishlistBadge = document.querySelector('.wishlist-badge');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            wishlistBadge.style.display = wishlist.length > 0 ? 'block' : 'none';
        }

        // تحديث عداد السلة (مع مراعاة الكميات)
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = cartTotal;
            cartBadge.style.display = cartTotal > 0 ? 'block' : 'none';
        }
    };

    // معالجة أحداث المفضلة
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('fa-heart')) {
            const product = e.target.closest('.product');
            if (!product) return;

            const productId = product.dataset.productId;
            const productName = product.querySelector('.product-name').textContent;
            const productPrice = product.querySelector('.product-price').textContent;
            const productImage = product.querySelector('.product-image').src;

            const existingIndex = wishlist.findIndex(item => item.id === productId);

            try {
                if (existingIndex > -1) {
                    const { isConfirmed } = await Swal.fire({
                        icon: 'question',
                        title: 'Remove from Wishlist?',
                        text: `Are you sure you want to remove ${productName}?`,
                        showCancelButton: true,
                        confirmButtonText: 'Yes, remove it!',
                        cancelButtonText: 'Cancel',
                        customClass: {
                            popup: 'custom-swal-popup'
                        }
                    });

                    if (isConfirmed) {
                        wishlist.splice(existingIndex, 1);
                        await Swal.fire({
                            icon: 'success',
                            title: 'Removed!',
                            text: `${productName} removed from wishlist`,
                            toast: true,
                            position: 'top-end',
                            timer: 2000
                        });
                    }
                } else {
                    wishlist.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage
                    });
                    await Swal.fire({
                        icon: 'success',
                        title: 'Added!',
                        text: `${productName} added to wishlist`,
                        toast: true,
                        position: 'top-end',
                        timer: 2000
                    });
                }

                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                e.target.classList.toggle('active', existingIndex === -1);
                updateBadges();
            } catch (error) {
                console.error('Error handling wishlist:', error);
            }
        }
    });

    // معالجة أحداث السلة (نظام الكميات المحسّن)
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const product = e.target.closest('.product');
            if (!product) return;

            const productId = product.dataset.productId;
            const productName = product.querySelector('.product-name').textContent;
            const productPrice = product.querySelector('.product-price').textContent;
            const productImage = product.querySelector('.product-image').src;

            const existingItemIndex = cart.findIndex(item => item.id === productId);

            try {
                if (existingItemIndex > -1) {
                    const { value: action } = await Swal.fire({
                        icon: 'question',
                        title: 'Manage Quantity',
                        html: `<p>Current quantity: ${cart[existingItemIndex].quantity}</p>`,
                        showDenyButton: true,
                        confirmButtonText: 'Add More',
                        denyButtonText: 'Remove',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel'
                    });

                    if (action === 'confirm') {
                        cart[existingItemIndex].quantity++;
                        await Swal.fire({
                            icon: 'success',
                            title: 'Quantity Updated!',
                            text: `New quantity: ${cart[existingItemIndex].quantity}`,
                            toast: true,
                            position: 'top-end',
                            timer: 2000
                        });
                    } else if (action === 'deny') {
                        if (cart[existingItemIndex].quantity > 1) {
                            cart[existingItemIndex].quantity--;
                        } else {
                            cart.splice(existingItemIndex, 1);
                        }
                        await Swal.fire({
                            icon: 'success',
                            title: 'Quantity Updated!',
                            text: action === 'deny' ? 'Item removed' : `New quantity: ${cart[existingItemIndex]?.quantity || 0}`,
                            toast: true,
                            position: 'top-end',
                            timer: 2000
                        });
                    }
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                    await Swal.fire({
                        icon: 'success',
                        title: 'Added to Cart!',
                        text: `${productName} added successfully`,
                        toast: true,
                        position: 'top-end',
                        timer: 2000
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateBadges();
            } catch (error) {
                console.error('Error handling cart:', error);
            }
        }
    });

    // التهيئة الأولية
    updateBadges();
});