**Important edge cases**
Product becomes out of stock while it is already in the cart.
Price changes between adding to cart and checkout.
Multiple tabs/windows.
Double-clicking Place Order.
Refresh during payment.
Network interruption during checkout.
Session expiration during checkout.
Browser back button after logout.
Duplicate order creation.
Concurrent users purchasing the last available item.

**Automation Prioritization**
I would prioritize automation based on business criticality, risk, execution frequency, stability and return on investment 
rather than simply automating everything.
**Priority 1 – Critical business flows**

Automate first:

Login
Product search
Add to cart
Checkout
Payment
Order creation

These directly impact revenue and customer experience.

**Priority 2 – High-frequency regression**

Automate:

Frequently executed regression scenarios
Smoke tests
Critical API validations
Data validation
Cross-browser scenarios

**Priority 3 – Stable repetitive scenarios**

Examples:

Search
Filtering
Sorting
Profile management
Order history

**Lower priority**

Avoid automating initially:

Frequently changing UI
One-time scenarios
Exploratory testing
Tests requiring subjective visual assessment
Features with very low business value
